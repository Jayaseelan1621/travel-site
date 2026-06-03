import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function Packages() {
    const [packages, setPackages] = useState([])
    const [loading, setLoading] = useState(true)

    async function load() {
        try {
            const res = await api.get('/packages/admin/all')
            setPackages(res.data)
        } finally { setLoading(false) }
    }

    useEffect(() => { load() }, [])

    async function deletePackage(id) {
        if (!confirm('Delete this package?')) return
        await api.delete(`/packages/${id}`)
        load()
    }

    async function toggleStatus(pkg) {
        const fd = new FormData()
        Object.entries(pkg).forEach(([k, v]) => { if (v !== null) fd.append(k, v) })
        fd.set('is_active', pkg.is_active ? 0 : 1)
        await api.put(`/packages/${pkg.id}`, fd)
        load()
    }

    if (loading) return <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}>Loading...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800 }}>Packages</h1>
                    <p style={{ color: '#6b7280', fontSize: 14 }}>{packages.length} total packages</p>
                </div>
                <Link to="/packages/new">
                    <button style={{
                        background: '#22c55e', color: 'white', border: 'none',
                        padding: '10px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14
                    }}>+ Add Package</button>
                </Link>
            </div>

            <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                            {['Cover', 'Title', 'Destination', 'Duration', 'Price', 'Category', 'Status', 'Actions'].map(h => (
                                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#6b7280', letterSpacing: 1 }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map(pkg => (
                            <tr key={pkg.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <td style={{ padding: '12px 16px' }}>
                                    {pkg.cover_image
                                        ? <img src={`http://localhost:5000/uploads/${pkg.cover_image}`} alt="" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 8 }} />
                                        : <div style={{ width: 60, height: 40, background: '#f3f4f6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>📦</div>
                                    }
                                </td>
                                <td style={{ padding: '12px 16px', fontWeight: 600, fontSize: 14 }}>{pkg.title}</td>
                                <td style={{ padding: '12px 16px', fontSize: 14, color: '#6b7280' }}>{pkg.destination}</td>
                                <td style={{ padding: '12px 16px', fontSize: 14, color: '#6b7280' }}>{pkg.duration}</td>
                                <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600, color: '#22c55e' }}>{pkg.price}</td>
                                <td style={{ padding: '12px 16px' }}>
                                    <span style={{ background: '#f3f4f6', padding: '3px 10px', borderRadius: 20, fontSize: 12 }}>{pkg.category}</span>
                                </td>
                                <td style={{ padding: '12px 16px' }}>
                                    <button onClick={() => toggleStatus(pkg)} style={{
                                        padding: '4px 12px', borderRadius: 20, border: 'none', fontSize: 12, fontWeight: 600,
                                        background: pkg.is_active ? '#dcfce7' : '#fee2e2',
                                        color: pkg.is_active ? '#16a34a' : '#dc2626'
                                    }}>{pkg.is_active ? 'Active' : 'Inactive'}</button>
                                </td>
                                <td style={{ padding: '12px 16px' }}>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <Link to={`/packages/edit/${pkg.id}`}>
                                            <button style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid #e5e7eb', background: 'white', fontSize: 13, fontWeight: 600 }}>✏️ Edit</button>
                                        </Link>
                                        <button onClick={() => deletePackage(pkg.id)} style={{ padding: '6px 14px', borderRadius: 8, border: '1.5px solid #fee2e2', background: '#fef2f2', color: '#ef4444', fontSize: 13, fontWeight: 600 }}>🗑️ Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {packages.length === 0 && (
                    <div style={{ textAlign: 'center', padding: 48, color: '#9ca3af' }}>No packages yet. <Link to="/packages/new" style={{ color: '#22c55e' }}>Add one!</Link></div>
                )}
            </div>
        </div>
    )
}