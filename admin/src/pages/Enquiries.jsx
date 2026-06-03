import { useState, useEffect } from 'react'
import api from '../api'

const statusColors = {
    new: { bg: '#dbeafe', color: '#1d4ed8' },
    contacted: { bg: '#fef9c3', color: '#854d0e' },
    confirmed: { bg: '#dcfce7', color: '#15803d' },
    closed: { bg: '#f3f4f6', color: '#6b7280' },
}

export default function Enquiries() {
    const [enquiries, setEnquiries] = useState([])
    const [filter, setFilter] = useState('all')
    const [selected, setSelected] = useState(null)

    async function load() {
        const res = await api.get('/enquiries')
        setEnquiries(res.data)
    }

    useEffect(() => { load() }, [])

    async function updateStatus(id, status) {
        await api.put(`/enquiries/${id}`, { status })
        load()
        if (selected?.id === id) setSelected({ ...selected, status })
    }

    async function deleteEnquiry(id) {
        if (!confirm('Delete this enquiry?')) return
        await api.delete(`/enquiries/${id}`)
        setSelected(null)
        load()
    }

    const filtered = filter === 'all' ? enquiries : enquiries.filter(e => e.status === filter)

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800 }}>Enquiries</h1>
                <p style={{ color: '#6b7280', fontSize: 14 }}>{enquiries.length} total · {enquiries.filter(e => e.status === 'new').length} new</p>
            </div>

            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {['all', 'new', 'contacted', 'confirmed', 'closed'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{
                        padding: '7px 18px', borderRadius: 20, border: '1.5px solid',
                        borderColor: filter === f ? '#22c55e' : '#e5e7eb',
                        background: filter === f ? '#22c55e' : 'white',
                        color: filter === f ? 'white' : '#374151',
                        fontSize: 13, fontWeight: 600, textTransform: 'capitalize'
                    }}>{f}</button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 20 }}>

                {/* List */}
                <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                {['Name', 'Email', 'Destination', 'Travelers', 'Date', 'Status', 'Action'].map(h => (
                                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#6b7280', letterSpacing: 1 }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(enq => (
                                <tr key={enq.id}
                                    onClick={() => setSelected(enq)}
                                    style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer', background: selected?.id === enq.id ? '#f0fdf4' : 'white' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 600, fontSize: 14 }}>{enq.full_name}</td>
                                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#6b7280' }}>{enq.email}</td>
                                    <td style={{ padding: '12px 16px', fontSize: 13 }}>{enq.destination}</td>
                                    <td style={{ padding: '12px 16px', fontSize: 13, textAlign: 'center' }}>{enq.traveler_count}</td>
                                    <td style={{ padding: '12px 16px', fontSize: 12, color: '#9ca3af' }}>{new Date(enq.created_at).toLocaleDateString()}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span style={{
                                            padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                                            background: statusColors[enq.status]?.bg || '#f3f4f6',
                                            color: statusColors[enq.status]?.color || '#6b7280'
                                        }}>{enq.status}</span>
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <button onClick={(e) => { e.stopPropagation(); deleteEnquiry(enq.id) }}
                                            style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: 16, cursor: 'pointer' }}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div style={{ textAlign: 'center', padding: 48, color: '#9ca3af' }}>No enquiries found</div>
                    )}
                </div>

                {/* Detail Panel */}
                {selected && (
                    <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', alignSelf: 'start' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <h3 style={{ fontWeight: 700, fontSize: 16 }}>Enquiry Detail</h3>
                            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: 20, color: '#9ca3af', cursor: 'pointer' }}>×</button>
                        </div>

                        {[
                            ['Name', selected.full_name],
                            ['Email', selected.email],
                            ['Phone', selected.phone || '—'],
                            ['Destination', selected.destination],
                            ['Travelers', selected.traveler_count],
                            ['Date', new Date(selected.created_at).toLocaleString()],
                        ].map(([label, value]) => (
                            <div key={label} style={{ marginBottom: 14 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: 1, marginBottom: 3 }}>{label.toUpperCase()}</div>
                                <div style={{ fontSize: 14, color: '#111' }}>{value}</div>
                            </div>
                        ))}

                        {selected.vision && (
                            <div style={{ marginBottom: 20 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: 1, marginBottom: 6 }}>THE VISION</div>
                                <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, background: '#f9fafb', padding: '12px 14px', borderRadius: 10 }}>{selected.vision}</div>
                            </div>
                        )}

                        <div style={{ marginBottom: 16 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: 1, marginBottom: 8 }}>UPDATE STATUS</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                {['new', 'contacted', 'confirmed', 'closed'].map(s => (
                                    <button key={s} onClick={() => updateStatus(selected.id, s)} style={{
                                        padding: '8px', borderRadius: 8, border: '1.5px solid',
                                        borderColor: selected.status === s ? '#22c55e' : '#e5e7eb',
                                        background: selected.status === s ? '#22c55e' : 'white',
                                        color: selected.status === s ? 'white' : '#374151',
                                        fontSize: 13, fontWeight: 600, textTransform: 'capitalize'
                                    }}>{s}</button>
                                ))}
                            </div>
                        </div>

                        <button onClick={() => deleteEnquiry(selected.id)} style={{
                            width: '100%', padding: '10px', borderRadius: 10,
                            background: '#fef2f2', color: '#ef4444',
                            border: '1.5px solid #fee2e2', fontWeight: 700, fontSize: 14
                        }}>🗑️ Delete Enquiry</button>
                    </div>
                )}
            </div>
        </div>
    )
}