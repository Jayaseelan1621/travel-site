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

// GET all (public)
router.get('/', (req, res) => {
    res.json(db.prepare('SELECT * FROM gallery ORDER BY created_at DESC').all())
})

// CREATE
router.post('/', auth, upload.single('image'), (req, res) => {
    const { title, category } = req.body
    const image_url = req.file?.filename
    if (!image_url) return res.status(400).json({ error: 'Image required' })
    const result = db.prepare('INSERT INTO gallery (title, image_url, category) VALUES (?, ?, ?)').run(title, image_url, category)
    res.json({ id: result.lastInsertRowid, message: 'Image added!' })
})

// DELETE
router.delete('/:id', auth, (req, res) => {
    db.prepare('DELETE FROM gallery WHERE id = ?').run(req.params.id)
    res.json({ message: 'Deleted!' })
})

module.exports = router