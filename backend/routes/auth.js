const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../database')

// Create default admin (run once)
const existing = db.prepare('SELECT * FROM admins WHERE username = ?').get('admin')
if (!existing) {
    const hash = bcrypt.hashSync('admin123', 10)
    db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run('admin', hash)
    console.log('✅ Default admin created: admin / admin123')
}

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body
    const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username)
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' })

    const valid = bcrypt.compareSync(password, admin.password)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, username: admin.username })
})

module.exports = router