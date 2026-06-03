const express = require('express')
const router = express.Router()
const db = require('../database')
const auth = require('../middleware/auth')

// PUBLIC — submit enquiry (from contact form)
router.post('/', (req, res) => {
    const { full_name, email, phone, destination, traveler_count, vision } = req.body
    const result = db.prepare(`
    INSERT INTO enquiries (full_name, email, phone, destination, traveler_count, vision)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(full_name, email, phone, destination, traveler_count, vision)
    res.json({ id: result.lastInsertRowid, message: 'Enquiry submitted!' })
})

// ADMIN — get all
router.get('/', auth, (req, res) => {
    res.json(db.prepare('SELECT * FROM enquiries ORDER BY created_at DESC').all())
})

// ADMIN — update status
router.put('/:id', auth, (req, res) => {
    const { status } = req.body
    db.prepare('UPDATE enquiries SET status = ? WHERE id = ?').run(status, req.params.id)
    res.json({ message: 'Status updated!' })
})

// ADMIN — delete
router.delete('/:id', auth, (req, res) => {
    db.prepare('DELETE FROM enquiries WHERE id = ?').run(req.params.id)
    res.json({ message: 'Deleted!' })
})

module.exports = router