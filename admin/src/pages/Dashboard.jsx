import { useState, useEffect } from 'react'
import api from '../api'

export default function Dashboard() {
    const [stats, setStats] = useState({ packages: 0, gallery: 0, enquiries: 0, newEnquiries: 0 })

    useEffect(() => {
        async function load() {
            try {
                const [pkgs, gal, enq] = await Promise.all([
                    api.get('/packages/admin/all'),
                    api.get('/gallery'),
                    api.get('/enquiries'),
                ])
                setStats({
                    packages: pkgs.data.length,
                    gallery: gal.data.length,
                    enquiries: enq.data.length,
                    newEnquiries: enq.data.filter(e => e.status === 'new').length
                })
            } catch (err) { console.error(err) }
        }
        load()
    }, [])

    const cards = [
        { label: 'Total Packages', value: stats.packages, icon: '📦', color: '#22c55e' },
        { label: 'Gallery Images', value: stats.gallery, icon: '🖼️', color: '#3b82f6' },
        { label: 'Total Enquiries', value: stats.enquiries, icon: '📩', color: '#f59e0b' },
        { label: 'New Enquiries', value: stats.newEnquiries, icon: '🔔', color: '#ef4444' },
    ]

    return (
        <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Dashboard</h1>
            <p style={{ color: '#6b7280', marginBottom: 32 }}>Welcome to Euphoric Admin Panel</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                {cards.map(card => (
                    <div key={card.label} style={{
                        background: 'white', borderRadius: 16, padding: '24px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                        borderLeft: `4px solid ${card.color}`
                    }}>
                        <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
                        <div style={{ fontSize: 32, fontWeight: 900, color: card.color, marginBottom: 4 }}>{card.value}</div>
                        <div style={{ fontSize: 14, color: '#6b7280' }}>{card.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}