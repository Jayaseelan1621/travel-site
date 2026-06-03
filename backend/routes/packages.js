const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const db = require('../database')
const auth = require('../middleware/auth')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

// GET all packages (public)
router.get('/', (req, res) => {
    const packages = db.prepare('SELECT * FROM packages WHERE is_active = 1').all()
    res.json(packages)
})

// GET single package (public)
router.get('/:id', (req, res) => {
    const pkg = db.prepare('SELECT * FROM packages WHERE id = ?').get(req.params.id)
    if (!pkg) return res.status(404).json({ error: 'Not found' })
    res.json(pkg)
})

// GET all for admin
router.get('/admin/all', auth, (req, res) => {
    const packages = db.prepare('SELECT * FROM packages').all()
    res.json(packages)
})

// CREATE package
router.post('/', auth, upload.fields([
    { name: 'cover_image', maxCount: 1 },
    { name: 'gallery_images', maxCount: 10 }
]), (req, res) => {
    const {
        title, destination, duration, price, category,
        overview, highlights, itinerary, inclusions,
        exclusions, terms
    } = req.body

    const cover_image = req.files?.cover_image?.[0]?.filename || null
    const gallery_images = req.files?.gallery_images
        ? JSON.stringify(req.files.gallery_images.map(f => f.filename))
        : '[]'

    const result = db.prepare(`
    INSERT INTO packages
    (title, destination, duration, price, category, overview, highlights,
     itinerary, inclusions, exclusions, terms, cover_image, gallery_images)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title, destination, duration, price, category, overview,
        highlights, itinerary, inclusions, exclusions, terms,
        cover_image, gallery_images)

    res.json({ id: result.lastInsertRowid, message: 'Package created!' })
})

// UPDATE package
router.put('/:id', auth, upload.fields([
    { name: 'cover_image', maxCount: 1 },
    { name: 'gallery_images', maxCount: 10 }
]), (req, res) => {
    const {
        title, destination, duration, price, category,
        overview, highlights, itinerary, inclusions,
        exclusions, terms, is_active
    } = req.body

    const existing = db.prepare('SELECT * FROM packages WHERE id = ?').get(req.params.id)
    if (!existing) return res.status(404).json({ error: 'Not found' })

    const cover_image = req.files?.cover_image?.[0]?.filename || existing.cover_image
    const gallery_images = req.files?.gallery_images
        ? JSON.stringify(req.files.gallery_images.map(f => f.filename))
        : existing.gallery_images

    db.prepare(`
    UPDATE packages SET
    title=?, destination=?, duration=?, price=?, category=?,
    overview=?, highlights=?, itinerary=?, inclusions=?,
    exclusions=?, terms=?, cover_image=?, gallery_images=?, is_active=?
    WHERE id=?
  `).run(title, destination, duration, price, category, overview,
        highlights, itinerary, inclusions, exclusions, terms,
        cover_image, gallery_images, is_active ?? 1, req.params.id)

    res.json({ message: 'Package updated!' })
})

// DELETE package
router.delete('/:id', auth, (req, res) => {
    db.prepare('DELETE FROM packages WHERE id = ?').run(req.params.id)
    res.json({ message: 'Package deleted!' })
})

module.exports = router