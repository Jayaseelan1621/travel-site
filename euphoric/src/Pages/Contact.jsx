import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api'

export default function Contact() {
    const [searchParams] = useSearchParams()
    const packageName = searchParams.get('package') || 'Amalfi Coast, Italy'

    const [travelers, setTravelers] = useState('2-4')
    const [checked, setChecked] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const [formData, setFormData] = useState({
        full_name: '', email: '', phone: '',
        destination: packageName,
        traveler_count: '2-4', vision: ''
    })

    function setField(field, value) {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    async function handleSubmit() {
        if (!formData.full_name || !formData.email) {
            alert('Please fill in your name and email')
            return
        }
        setSubmitting(true)
        try {
            await api.post('/enquiries', { ...formData, traveler_count: travelers })
            setSubmitted(true)
        } catch (err) {
            alert('Something went wrong. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div style={{ background: '#ffffff', minHeight: '100vh' }}>
            <style>{`
        .contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; align-items: start; }
        .contact-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .contact-form-grid { grid-template-columns: 1fr !important; }
          .contact-hero { padding: 40px 16px 32px !important; }
          .contact-section { padding: 0 16px 60px !important; }
        }
      `}</style>

            {/* HERO */}
            <section className="contact-hero" style={{ padding: '72px 5vw 48px', textAlign: 'center', background: '#ffffff' }}>
                <div style={{
                    background: '#f59e0b', color: 'white', fontSize: 11, fontWeight: 700,
                    letterSpacing: 2, padding: '7px 20px', borderRadius: 24,
                    display: 'inline-block', marginBottom: 32
                }}>GET IN TOUCH · WE'RE HERE FOR YOU</div>
                <h1 style={{ fontSize: 'clamp(22px, 4vw, 52px)', fontWeight: 800, color: '#9ca3af', lineHeight: 1.2, margin: 0 }}>
                    Let's plan something worth talking about.
                </h1>
            </section>

            {/* MAIN */}
            <section className="contact-section" style={{ padding: '0 5vw 80px' }}>
                <div className="contact-grid">

                    {/* LEFT */}
                    <div>
                        <div style={{ marginBottom: 36 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#22c55e', marginBottom: 20 }}>THE ATELIER</div>
                            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                <div style={{ width: 38, height: 38, background: 'rgba(34,197,94,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 17 }}>📍</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 15, color: '#22c55e', marginBottom: 6 }}>Euphoric Tours Travels</div>
                                    <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8 }}>121/125-A, New Trichy Branch Road,<br />Linemedu, Salem - 636006</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: 40 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#22c55e', marginBottom: 20 }}>DIRECT LINES</div>
                            {[['📞', '+91 99949 20445'], ['✉️', 'euphorictourstravels@gmail.com']].map(([icon, val]) => (
                                <div key={val} style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
                                    <div style={{ width: 38, height: 38, background: 'rgba(34,197,94,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 17 }}>{icon}</div>
                                    <span style={{ fontSize: 15, color: '#22c55e', fontWeight: 600 }}>{val}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative' }}>
                            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.7898608351993!2d78.14440967452794!3d11.638318542706111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babefd726bae4c3%3A0xf7674e62f6e279eb!2s121%2C%20New%20Trichy%20Branch%20Road%20South%20Street%2C%20Linemedu%2C%20Dadagapatty%2C%20Salem%2C%20Tamil%20Nadu%20636006!5e0!3m2!1sen!2sin!4v1778821031087!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                            <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=320&fit=crop" alt="Location" style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />
                            <div style={{ position: 'absolute', top: '45%', left: '45%', transform: 'translate(-50%,-50%)', width: 46, height: 46, background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 4px 20px rgba(34,197,94,0.5)', border: '3px solid white' }}>📍</div>
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 13, color: '#111' }}>Live Location</div>
                                    <div style={{ fontSize: 12, color: '#6b7280' }}>Salem, Tamil Nadu</div>
                                </div>
                                <button style={{ background: '#22c55e', color: 'white', border: 'none', padding: '8px 18px', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>GET DIRECTIONS</button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Form */}
                    <div style={{ background: 'white', borderRadius: 28, padding: '44px 44px', boxShadow: '0 8px 48px rgba(0,0,0,0.10)', border: '1px solid #f3f4f6', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, background: 'rgba(34,197,94,0.06)', borderRadius: '50%' }} />

                        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 6 }}>Send an Enquiry</h2>
                        <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 32 }}>Our specialists respond within 4 business hours.</p>

                        {/* Name + Email */}
                        <div className="contact-form-grid" style={{ marginBottom: 20 }}>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#9ca3af', display: 'block', marginBottom: 8 }}>FULL NAME</label>
                                <input
                                    value={formData.full_name}
                                    onChange={e => setField('full_name', e.target.value)}
                                    placeholder="e.g. James Sterling"
                                    style={{ width: '100%', padding: '14px 16px', border: 'none', background: '#f3f4f6', borderRadius: 12, outline: 'none', fontSize: 14, color: '#111', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#9ca3af', display: 'block', marginBottom: 8 }}>EMAIL ADDRESS</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setField('email', e.target.value)}
                                    placeholder="you@example.com"
                                    style={{ width: '100%', padding: '14px 16px', border: 'none', background: '#f3f4f6', borderRadius: 12, outline: 'none', fontSize: 14, color: '#111', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#9ca3af', display: 'block', marginBottom: 8 }}>PHONE NUMBER</label>
                            <input
                                value={formData.phone}
                                onChange={e => setField('phone', e.target.value)}
                                placeholder="+91 99999 99999"
                                style={{ width: '100%', padding: '14px 16px', border: 'none', background: '#f3f4f6', borderRadius: 12, outline: 'none', fontSize: 14, color: '#111', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
                            />
                        </div>

                        {/* Destination + Travelers */}
                        <div className="contact-form-grid" style={{ marginBottom: 20 }}>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#9ca3af', display: 'block', marginBottom: 8 }}>DESTINATION OF INTEREST</label>
                                <input
                                    value={formData.destination}
                                    onChange={e => setField('destination', e.target.value)}
                                    placeholder="e.g. Ooty, Tamil Nadu"
                                    style={{ width: '100%', padding: '14px 16px', border: 'none', background: '#f3f4f6', borderRadius: 12, outline: 'none', fontSize: 14, color: '#111', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#9ca3af', display: 'block', marginBottom: 8 }}>TRAVELER COUNT</label>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    {['2-4', '5-10', '10+'].map(t => (
                                        <button key={t} onClick={() => { setTravelers(t); setField('traveler_count', t) }} style={{
                                            flex: 1, padding: '14px 0', border: 'none',
                                            background: travelers === t ? '#22c55e' : '#f3f4f6',
                                            color: travelers === t ? 'white' : '#374151',
                                            borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 600, transition: 'all 0.2s'
                                        }}>{t}</button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Vision */}
                        <div style={{ marginBottom: 24 }}>
                            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#9ca3af', display: 'block', marginBottom: 8 }}>THE VISION</label>
                            <textarea
                                value={formData.vision}
                                onChange={e => setField('vision', e.target.value)}
                                placeholder="Tell us about the atmosphere, the milestones, and any unique requests you have for this journey..."
                                rows={5}
                                style={{ width: '100%', padding: '14px 16px', border: 'none', background: '#f3f4f6', borderRadius: 12, outline: 'none', fontSize: 14, color: '#111', resize: 'vertical', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box', lineHeight: 1.6 }}
                            />
                        </div>

                        {/* Checkbox */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 28 }}>
                            <div onClick={() => setChecked(!checked)} style={{
                                width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 2,
                                border: '2px solid', borderColor: checked ? '#22c55e' : '#d1d5db',
                                background: checked ? '#22c55e' : '#f9fafb',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s'
                            }}>
                                {checked && <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>✓</span>}
                            </div>
                            <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>
                                I would like to receive the monthly <span style={{ color: '#22c55e', fontWeight: 600 }}>Editorial Journal</span> featuring exclusive collections.
                            </p>
                        </div>

                        {/* Submit */}
                        {submitted ? (
                            <div style={{ padding: '20px', background: '#dcfce7', borderRadius: 14, textAlign: 'center' }}>
                                <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
                                <div style={{ fontWeight: 700, color: '#16a34a', fontSize: 16, marginBottom: 4 }}>Enquiry Submitted!</div>
                                <div style={{ fontSize: 14, color: '#15803d' }}>We'll contact you within 4 business hours.</div>
                            </div>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                style={{
                                    width: '100%', background: submitting ? '#86efac' : '#22c55e',
                                    color: 'white', border: 'none', padding: '18px', borderRadius: 14,
                                    fontWeight: 700, fontSize: 17, cursor: submitting ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'background 0.2s'
                                }}
                            >
                                {submitting ? 'Sending...' : 'Send Enquiry ↗'}
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}