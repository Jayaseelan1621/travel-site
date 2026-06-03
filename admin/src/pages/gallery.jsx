import { useState, useEffect } from 'react'
import api from '../api'

export default function Gallery() {
    const [images, setImages] = useState([])
    const [form, setForm] = useState({ title: '', category: 'General' })
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)

    async function load() {
        const res = await api.get('/gallery')
        setImages(res.data)
    }

    useEffect(() => { load() }, [])

    async function handleUpload(e) {
        e.preventDefault()
        if (!file) return alert('Please select an image')
        setUploading(true)
        try {
            const fd = new FormData()
            fd.append('image', file)
            fd.append('title', form.title)
            fd.append('category', form.category)
            await api.post('/gallery', fd)
            setForm({ title: '', category: 'General' })
            setFile(null)
            e.target.reset()
            load()
        } finally { setUploading(false) }
    }

    async function deleteImage(id) {
        if (!confirm('Delete this image?')) return
        await api.delete(`/gallery/${id}`)
        load()
    }

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800 }}>Gallery</h1>
                <p style={{ color: '#6b7280', fontSize: 14 }}>{images.length} images</p>
            </div>

            {/* Upload Form */}
            <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: '#22c55e' }}>📤 Upload Image</h2>
                <form onSubmit={handleUpload}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 12, alignItems: 'end' }}>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: 6 }}>TITLE</label>
                            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                                placeholder="Image title" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e5e7eb', outline: 'none', fontSize: 14, boxSizing: 'border-box' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: 6 }}>CATEGORY</label>
                            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #e5e7eb', outline: 'none', fontSize: 14 }}>
                                <option>General</option>
                                <option>Destinations</option>
                                <option>Packages</option>
                                <option>Events</option>
                                <option>Team</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: 6 }}>IMAGE FILE</label>
                            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} required
                                style={{ width: '100%', padding: '8px 14px', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: 14, boxSizing: 'border-box' }} />
                        </div>
                        <button type="submit" disabled={uploading} style={{
                            padding: '10px 24px', borderRadius: 10, background: '#22c55e',
                            color: 'white', border: 'none', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap'
                        }}>{uploading ? 'Uploading...' : '+ Upload'}</button>
                    </div>
                </form>
            </div>

            {/* Image Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                {images.map(img => (
                    <div key={img.id} style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                        <img src={`http://localhost:5000/uploads/${img.image_url}`} alt={img.title}
                            style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                        <div style={{ padding: '12px 14px' }}>
                            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{img.title || 'Untitled'}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ background: '#f3f4f6', padding: '2px 8px', borderRadius: 20, fontSize: 11 }}>{img.category}</span>
                                <button onClick={() => deleteImage(img.id)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {images.length === 0 && (
                <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af', background: 'white', borderRadius: 16 }}>
                    No images yet. Upload one above!
                </div>
            )}
        </div>
    )
}