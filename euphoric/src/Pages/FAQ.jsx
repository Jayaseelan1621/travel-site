import { useState } from 'react'
// import { Link } from 'react-router-dom'

const categories = [
    { icon: '💳', label: 'Payments', desc: 'Currency, invoices, and premium membership billing.', active: false },
    { icon: '📅', label: 'Booking', desc: 'Reservation status, modifications, and cancelations.', active: true },
    { icon: '🧭', label: 'Destinations', desc: 'Local customs, weather, and excursion details.', active: false },
    { icon: '🏠', label: 'Concierge', desc: 'Special requests, dietary needs, and technical help.', active: false },
]

const faqs = [
    { q: 'What is the cancellation policy for Private Collections?', a: "For our Private Collection tours, full refunds are available up to 45 days before departure. Cancellations within 30-45 days are eligible for a 50% credit toward future travel. For ultra-exclusive charters, specific terms apply as outlined in your personalized itinerary document." },
    { q: 'Can I customize my daily itinerary after booking?', a: null },
    { q: 'How do I upgrade to the Concierge Tier during my trip?', a: null },
    { q: 'Do you handle international visa applications?', a: null },
]

export default function FAQ() {
    const [openIdx, setOpenIdx] = useState(0)
    const [activeCategory, setActiveCategory] = useState('Booking')

    return (
        <div>
            {/* Header */}
            <section style={{ padding: '72px 24px 52px', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: 'clamp(28px, 4vw, 50px)', fontWeight: 800, marginBottom: 12 }}>How can we assist your odyssey?</h1>
                    <p style={{ color: '#6b7280', fontSize: 15, maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.7 }}>From visa requirements to curated dining requests, find everything you need to prepare for your next extraordinary journey.</p>
                    <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>🔍</span>
                        <input placeholder="Search for answers (e.g. 'refund policy', 'private jet baggage')" style={{ width: '100%', padding: '14px 16px 14px 44px', border: '1.5px solid #e5e7eb', borderRadius: 12, outline: 'none', fontSize: 14, boxSizing: 'border-box' }} />
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section style={{ padding: '0 24px 48px' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
                        {categories.map(c => (
                            <div key={c.label} onClick={() => setActiveCategory(c.label)} style={{
                                padding: 24, borderRadius: 16, border: '1.5px solid', cursor: 'pointer',
                                borderColor: activeCategory === c.label ? '#22c55e' : '#f3f4f6',
                                background: activeCategory === c.label ? '#22c55e' : 'white',
                                transition: 'all 0.2s'
                            }}>
                                <div style={{ fontSize: 24, marginBottom: 10 }}>{c.icon}</div>
                                <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: activeCategory === c.label ? 'white' : '#111' }}>{c.label}</h3>
                                <p style={{ fontSize: 12, lineHeight: 1.6, color: activeCategory === c.label ? 'rgba(255,255,255,0.8)' : '#6b7280' }}>{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ section */}
            <section style={{ padding: '0 24px 80px' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>
                        <div>
                            <div className="section-label">BOOKING INFORMATION</div>
                            <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800, marginBottom: 28 }}>Reservations & Changes</h2>
                            {faqs.map((f, i) => (
                                <div key={i} style={{ borderBottom: '1px solid #f3f4f6', marginBottom: 0 }}>
                                    <button onClick={() => setOpenIdx(openIdx === i ? -1 : i)} style={{
                                        width: '100%', textAlign: 'left', padding: '18px 0', background: 'none', border: 'none',
                                        cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16
                                    }}>
                                        <span style={{ fontSize: 15, fontWeight: 500, color: '#111' }}>{f.q}</span>
                                        <span style={{ color: '#22c55e', flexShrink: 0 }}>{openIdx === i ? '∧' : '∨'}</span>
                                    </button>
                                    {openIdx === i && f.a && (
                                        <div style={{ paddingBottom: 18, fontSize: 14, color: '#6b7280', lineHeight: 1.8 }}>{f.a}</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
                                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=280&fit=crop" alt="help" style={{ width: '100%', height: 240, objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 24 }}>
                                    <h3 style={{ color: 'white', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Need a faster answer?</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 16 }}>Our 24/7 dedicated travel concierge is ready to assist you personally.</p>
                                    <button style={{ background: 'white', color: '#111', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 14, width: 'fit-content' }}>Start Live Chat</button>
                                </div>
                            </div>

                            <div style={{ background: '#f9fafb', borderRadius: 16, padding: 20, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                <div style={{ color: '#22c55e', fontSize: 18 }}>✓</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Verified Security</div>
                                    <p style={{ fontSize: 13, color: '#6b7280' }}>All payments and data are protected by bank-grade encryption.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Still have questions */}
            <section style={{ background: '#f9fafb', padding: '60px 24px', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 800, marginBottom: 8 }}>Still have questions?</h2>
                    <p style={{ color: '#6b7280', fontSize: 14, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7 }}>If you can't find what you're looking for, our global support team is just a moment away. We pride ourselves on response times under 5 minutes.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, maxWidth: 640, margin: '0 auto' }}>
                        {[
                            { icon: '💬', title: 'Chat with us', desc: 'Speak with our concierge team now.', btn: 'Open Chat Window', color: '#22c55e' },
                            { icon: '📞', title: 'Call our office', desc: 'Mon-Fri from 8am to 10pm.', btn: '+1 (800) EUPHORIC', color: '#111' },
                            { icon: '✉', title: 'Email support', desc: 'For detailed or non-urgent queries.', btn: 'Send an Email', color: '#374151' },
                        ].map(item => (
                            <div key={item.title} style={{ padding: 24, background: 'white', borderRadius: 16, border: '1px solid #f3f4f6' }}>
                                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                                <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{item.title}</h3>
                                <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16, lineHeight: 1.6 }}>{item.desc}</p>
                                <button style={{ background: 'none', border: 'none', color: item.color, fontWeight: 700, cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}>{item.btn}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}