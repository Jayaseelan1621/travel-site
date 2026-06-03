const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.join(__dirname, 'euphoric.db'))

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS packages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    destination TEXT,
    duration TEXT,
    price TEXT,
    category TEXT,
    overview TEXT,
    highlights TEXT,
    itinerary TEXT,
    inclusions TEXT,
    exclusions TEXT,
    terms TEXT,
    cover_image TEXT,
    gallery_images TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    image_url TEXT NOT NULL,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    destination TEXT,
    traveler_count TEXT,
    vision TEXT,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)

module.exports = db