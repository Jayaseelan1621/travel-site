const express = require('express')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/packages', require('./routes/packages'))
app.use('/api/gallery', require('./routes/gallery'))
app.use('/api/enquiries', require('./routes/enquiries'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/docs', require('./routes/parseDoc'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`)
})