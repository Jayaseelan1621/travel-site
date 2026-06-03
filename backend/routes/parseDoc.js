const express = require('express')
const router = express.Router()
const multer = require('multer')
const mammoth = require('mammoth')
const auth = require('../middleware/auth')

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/parse-docx', auth, upload.single('docx'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

        const result = await mammoth.extractRawText({ buffer: req.file.buffer })
        const text = result.value
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean)

        console.log('📄 Extracted lines:', lines)

        // ── TITLE ──
        const title = lines[0] || ''

        // ── DURATION ──
        let duration = ''
        for (const line of lines) {
            if (/night|day/i.test(line) && /\d/.test(line)) {
                // Clean up markdown table artifacts
                duration = line.replace(/\|/g, '').replace(/\*/g, '').trim()
                if (duration.length < 50) break
            }
        }

        // ── DESTINATION ──
        let destination = ''
        const planLine = lines.find(l => /Plan/i.test(l) && l.includes('|'))
        if (planLine) {
            destination = planLine
                .replace(/\|/g, '')
                .replace(/\*\*/g, '')
                .replace(/Plan/i, '')
                .trim()
        } else {
            destination = title
        }

        // ── PRICE ──
        let price = ''
        const priceLine = lines.find(l =>
            /package cost/i.test(l) || /₹|rs\.?|inr/i.test(l) || /cost/i.test(l)
        )
        if (priceLine) {
            price = priceLine.replace(/\|/g, '').replace(/\*\*/g, '').trim()
        }

        // ── CATEGORY ──
        let category = 'Domestic'
        const fullText = text.toLowerCase()
        if (fullText.includes('international') || fullText.includes('visa')) category = 'International'
        else if (fullText.includes('pilgrimage') || fullText.includes('temple') && fullText.includes('char dham')) category = 'Pilgrimage'
        else if (fullText.includes('honeymoon')) category = 'Honeymoon'
        else if (fullText.includes('school') || fullText.includes('student')) category = 'School Package'
        else if (fullText.includes('corporate')) category = 'Corporate'

        // ── OVERVIEW ──
        // Build from title + destination info
        const overview = `Experience the best of ${destination} with our curated ${duration} package. ${title} includes sightseeing, accommodation, meals, and transportation as per the itinerary.`

        // ── ITINERARY ── (from Day plan table)
        const itinerary = []
        let inPlanDetails = false

        for (const line of lines) {
            if (/plan details/i.test(line)) { inPlanDetails = true; continue }
            if (/tariff|inclusion|exclusion|note/i.test(line)) { inPlanDetails = false }

            if (inPlanDetails) {
                // Match table rows like: | 00 | Departure from Salem... |
                // or: | 01 | Arrival at Bangalore... |
                const tableRow = line.match(/\|\s*(\d+)\s*\|\s*(.+)/)
                if (tableRow) {
                    const dayNum = parseInt(tableRow[1])
                    const activity = tableRow[2]
                        .replace(/\*\*/g, '')
                        .replace(/\*/g, '')
                        .replace(/\|/g, '')
                        .trim()

                    let timeLabel = ''
                    if (dayNum === 0) timeLabel = 'Day 0'
                    else if (dayNum === 1) timeLabel = 'Day 1'
                    else if (dayNum === 2) timeLabel = 'Day 2'
                    else if (dayNum === 3) timeLabel = 'Day 3'
                    else timeLabel = `Day ${dayNum}`

                    if (activity) {
                        itinerary.push({ time: timeLabel, activity })
                    }
                }
            }
        }

        // ── HIGHLIGHTS ── (extract key places from itinerary)
        const highlights = []
        const placePatterns = []

        for (const item of itinerary) {
            // Extract bold-marked places (originally **Place**)
            const places = item.activity.match(/[A-Z][a-zA-Z\s&]+(?=\s|$)/g) || []
            for (const place of places) {
                const cleaned = place.trim()
                if (
                    cleaned.length > 3 &&
                    !['Arrival', 'Departure', 'Check', 'Transfer', 'Breakfast', 'Lunch', 'Dinner', 'Night', 'Stay', 'Hotel', 'Starts', 'From', 'Bus', 'From'].includes(cleaned) &&
                    !highlights.includes(cleaned)
                ) {
                    highlights.push(cleaned)
                }
            }
        }

        // If no highlights extracted, use generic ones
        if (highlights.length === 0) {
            highlights.push(
                'Professional Tour Manager',
                'All Meals Included',
                'AC Transportation',
                'Hotel Accommodation',
                'All Sightseeing'
            )
        }

        // ── INCLUSIONS ──
        const inclusions = []
        let inInclusions = false

        for (const line of lines) {
            if (/^###?\s*inclusion/i.test(line) || line.toLowerCase() === 'inclusions') {
                inInclusions = true; continue
            }
            if (/^###?\s*exclusion/i.test(line) || /^###?\s*note/i.test(line) || line.toLowerCase() === 'exclusions') {
                inInclusions = false
            }
            if (inInclusions && line.startsWith('-')) {
                const item = line.replace(/^-\s*/, '').replace(/\*\*/g, '').trim()
                if (item) inclusions.push(item)
            }
        }

        // ── EXCLUSIONS ──
        const exclusions = []
        let inExclusions = false

        for (const line of lines) {
            if (/^###?\s*exclusion/i.test(line) || line.toLowerCase() === 'exclusions') {
                inExclusions = true; continue
            }
            if (/^###?\s*note/i.test(line) || /^##?\s*(tariff|tour payment|cancellation)/i.test(line) || line.toLowerCase() === 'notes') {
                inExclusions = false
            }
            if (inExclusions && line.startsWith('-')) {
                const item = line.replace(/^-\s*/, '').replace(/\*\*/g, '').trim()
                if (item) exclusions.push(item)
            }
        }

        // ── TERMS ──
        const terms = []
        let inTerms = false
        let inCancellation = false

        for (const line of lines) {
            // Payment terms
            if (/tour payment terms/i.test(line)) { inTerms = true; continue }
            if (/cancellation policy/i.test(line)) { inTerms = false; inCancellation = true; continue }
            if (/account details/i.test(line)) { inCancellation = false }

            if (inTerms && line.startsWith('-')) {
                const item = line.replace(/^-\s*/, '').replace(/\*\*/g, '').trim()
                if (item) terms.push(item)
            }

            // Cancellation table rows
            if (inCancellation) {
                const cancelRow = line.match(/\|\s*(.+?)\s*\|\s*(.+?)\s*\|/)
                if (cancelRow && !/No of Days|%/i.test(cancelRow[1])) {
                    const days = cancelRow[1].replace(/\*\*/g, '').trim()
                    const charge = cancelRow[2].replace(/\*\*/g, '').trim()
                    if (days && charge && days !== '---') {
                        terms.push(`Cancellation ${days}: ${charge} charges apply`)
                    }
                }
            }
        }

        // Also add notes as terms
        let inNotes = false
        for (const line of lines) {
            if (/^###?\s*note/i.test(line) || line.toLowerCase() === 'notes') {
                inNotes = true; continue
            }
            if (/^#\s*(tariff|tour payment|cancellation|account)/i.test(line)) {
                inNotes = false
            }
            if (inNotes && line.startsWith('-')) {
                const item = line.replace(/^-\s*/, '').replace(/\*\*/g, '').trim()
                if (item) terms.push(item)
            }
        }

        const response = {
            title,
            destination,
            duration,
            price,
            category,
            overview,
            highlights,
            itinerary,
            inclusions,
            exclusions,
            terms,
        }

        console.log('✅ Parsed result:', JSON.stringify(response, null, 2))
        res.json(response)

    } catch (err) {
        console.error('❌ Parse error:', err)
        res.status(500).json({ error: 'Failed to parse document: ' + err.message })
    }
})

module.exports = router