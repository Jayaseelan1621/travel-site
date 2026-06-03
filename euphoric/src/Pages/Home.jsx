import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react'
import CountdownTimer from '../components/CountdownTimer'
import api from '../api'

const travelStyles = [
    { label: 'International', emoji: '✈️', img: '/Home_International.jpg' },
    { label: 'Domestic', emoji: '🏠', img: '/Home_Domestic.jpg' },
    { label: 'Honeymoon', emoji: '💕', img: '/Home_Honeymoon.jpg' },
    { label: 'Pilgrimage', emoji: '🛕', img: '/Home_Pilgrimage.jpg' },
]

export default function Home() {
    const [activeTab, setActiveTab] = useState('International')
    const [journeys, setJourneys] = useState([])

    useEffect(() => {
        api.get('/packages').then(res => {
            setJourneys(res.data.slice(0, 3).map(pkg => ({
                id: pkg.id,
                name: pkg.title,
                price: pkg.price,
                days: pkg.duration,
                people: pkg.destination,
                img: pkg.cover_image
                    ? `http://localhost:5000/uploads/${pkg.cover_image}`
                    : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=260&fit=crop',
                tag: pkg.category
            })))
        }).catch(() => { })
    }, [])

    return (
        <div style={{ background: 'white' }}>

            {/* HERO */}
            <section style={{ position: 'relative', height: '88vh', minHeight: 500, overflow: 'hidden' }}>
                <img src="/Home_Banner.png" alt="hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.2))' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 48px' }}>
                    <div style={{ maxWidth: 600 }}>
                        <div style={{ background: '#f59e0b', color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: '4px 12px', borderRadius: 20, display: 'inline-block', marginBottom: 20 }}>THE SOULFUL ATLAS</div>
                        <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', color: 'white', fontStyle: 'italic', fontFamily: 'Playfair Display, serif', lineHeight: 1.1, marginBottom: 8 }}>Escape the Ordinary.</h1>
                        <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: '#22c55e', fontFamily: 'Playfair Display, serif', fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>Discover the Extraordinary Within.</h1>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, lineHeight: 1.7 }}>Go beyond the map. Go beyond the ordinary. Where the world's wonders meet the wonder within you.</p>
                    </div>
                </div>

                {/* Search bar */}
                <div style={{
                    position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)',
                    background: 'white', borderRadius: 16, padding: '20px 28px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    display: 'flex', alignItems: 'center', gap: 24,
                    minWidth: 'min(720px, 90vw)', flexWrap: 'wrap'
                }}>
                    {[
                        { icon: <MapPin size={16} color="#22c55e" />, label: 'DESTINATION', placeholder: 'Where to next?' },
                        { icon: <Calendar size={16} color="#22c55e" />, label: 'DATES', placeholder: 'Add dates' },
                        { icon: <Users size={16} color="#22c55e" />, label: 'GUESTS', placeholder: 'How many?' },
                    ].map((f, i) => (
                        <div key={i} style={{ flex: 1, minWidth: 140 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                {f.icon}
                                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: '#9ca3af' }}>{f.label}</span>
                            </div>
                            <input placeholder={f.placeholder} style={{ border: 'none', outline: 'none', fontSize: 14, fontWeight: 500, width: '100%', color: '#111' }} />
                        </div>
                    ))}
                    <button className="btn-green" style={{ borderRadius: 12, padding: '14px 20px' }}>🔍</button>
                </div>
            </section>

            {/* ABOUT */}
            <section className="section" style={{ paddingTop: 100, background: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 60, alignItems: 'center' }}>

                        {/* Collage */}
                        <div style={{ position: 'relative', height: 500 }}>
                            <img src="/Home_1.jpg" alt="about"
                                style={{ position: 'absolute', left: 0, top: 0, width: '75%', height: '100%', objectFit: 'cover', borderRadius: 20 }} />
                            <div style={{
                                position: 'absolute', right: 40, bottom: -40,
                                width: '42%', height: '50%',
                                borderRadius: 16, overflow: 'hidden',
                                border: '4px solid white',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.18)'
                            }}>
                                <img src="/Home_2.jpg" alt="about secondary" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{
                                position: 'absolute', bottom: 28, left: 16,
                                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
                                color: 'white', padding: '7px 16px', borderRadius: 10,
                                fontSize: 12, fontWeight: 700, letterSpacing: 3
                            }}>✈ TRAVEL</div>
                        </div>

                        {/* Text */}
                        <div>
                            <div className="section-label">OUR PHILOSOPHY</div>
                            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.2, color: '#111' }}>
                                The Art of <em style={{ fontFamily: 'Playfair Display, serif' }}>Curation</em>
                            </h2>
                            <p style={{ color: '#6b7280', lineHeight: 1.8, marginBottom: 24, fontSize: 15 }}>
                                At Euphoric, we believe travel is more than just visiting a place – it's about how that place changes you. We don't just book hotels; we curate the small, soulful moments that define a lifetime.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
                                {[
                                    { title: 'Narrative First', desc: 'Every journey is designed as a story, with a beginning that excites and an end that stays with you.' },
                                    { title: 'Soulful Luxury', desc: 'We redefine luxury not by the thread count, but by the authenticity of the experience and the warmth of the welcome.' }
                                ].map((t, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                        <div style={{ width: 28, height: 28, background: '#dcfce7', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13 }}>✓</div>
                                        <div>
                                            <p style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 2 }}>{t.title}</p>
                                            <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>{t.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/about" style={{ color: '#22c55e', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                                Discover Our Story <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* NARRATIVE STYLES */}
            <section className="section" style={{ background: '#f9fafb' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <div className="section-label">CHOOSE YOUR RHYTHM</div>
                        <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111' }}>
                            Narrative <em style={{ fontFamily: 'Playfair Display, serif', color: '#22c55e' }}>Styles</em>
                        </h2>
                        <p style={{ color: '#6b7280', marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
                            From high-octane adventures to quiet moments of reflection. Find the travel style that speaks to your current chapter.
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                        {travelStyles.map(s => (
                            <div key={s.label} onClick={() => setActiveTab(s.label)}
                                style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', height: 350 }}>
                                <img src={s.img} alt={s.label}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.1))' }} />
                                <div style={{ position: 'absolute', bottom: 16, left: 16, color: 'white', fontWeight: 700, fontSize: 16 }}>{s.label}</div>
                                {activeTab === s.label && (
                                    <div style={{ position: 'absolute', top: 12, right: 12, background: '#22c55e', color: 'white', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>Selected</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROMO BANNER */}
            <section style={{ background: '#085508', padding: '48px 24px' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <div style={{ width: 8, height: 8, background: 'white', borderRadius: '50%' }} />
                            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Limited Offer</span>
                        </div>
                        <h2 style={{ color: 'white', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, lineHeight: 1.2 }}>
                            25% Off Your Next<br />Alpine Adventure
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 8 }}>
                            Book your winter retreat before November 30th and unlock exclusive access to pristine heli-skiing tours.
                        </p>
                        <button style={{ background: 'white', color: '#22c55e', border: 'none', padding: '10px 24px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', marginTop: 16 }}>
                            Claim Offer
                        </button>
                    </div>
                    <CountdownTimer />
                </div>
            </section>

            {/* TRENDING JOURNEYS */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
                        <div>
                            <div className="section-label">HAND-PICKED</div>
                            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800 }}>Trending <span style={{ color: '#22c55e' }}>Journeys</span></h2>
                            <p style={{ color: '#6b7280', fontSize: 14, marginTop: 8 }}>Expertly curated adventures loved by our community.</p>
                        </div>
                        <Link to="/packages" style={{ color: '#22c55e', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                            View All Packages →
                        </Link>
                    </div>

                    {journeys.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f9fafb', borderRadius: 20, color: '#9ca3af' }}>
                            <div style={{ fontSize: 40, marginBottom: 8 }}>📦</div>
                            <p>No packages yet. Add packages from admin panel!</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                            {journeys.map(j => (
                                <div key={j.id} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #f3f4f6', transition: 'box-shadow 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'}
                                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                                    <div style={{ position: 'relative' }}>
                                        <img src={j.img} alt={j.name} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                                        <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>{j.tag}</div>
                                    </div>
                                    <div style={{ padding: 20 }}>
                                        <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{j.name}</h3>
                                        <p style={{ color: '#22c55e', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>{j.price}</p>
                                        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                                            {j.days && <span style={{ fontSize: 13, color: '#6b7280' }}>📅 {j.days}</span>}
                                            {j.people && <span style={{ fontSize: 13, color: '#6b7280' }}>📍 {j.people}</span>}
                                        </div>
                                        <Link to={`/packages/${j.id}`}>
                                            <button style={{
                                                width: '100%', background: 'white', color: '#111',
                                                border: '1.5px solid #e5e7eb', padding: '10px', borderRadius: 10,
                                                fontWeight: 600, fontSize: 14, cursor: 'pointer'
                                            }}>View Itinerary →</button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="section" style={{ background: '#f9fafb' }}>
                <div className="container">
                    <div className="section-label" style={{ textAlign: 'center' }}>TESTIMONIALS</div>
                    <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, marginBottom: 48, color: '#111' }}>
                        Voices of the <em style={{ fontFamily: 'Playfair Display, serif', color: '#22c55e' }}>Well-Traveled</em>
                    </h2>
                    <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face"
                            alt="testimonial"
                            style={{ width: 400, height: 400, objectFit: 'cover', borderRadius: 16 }} />
                        <div style={{ flex: 1, minWidth: 350 }}>
                            <div style={{ fontSize: 52, color: '#22c55e', fontFamily: 'Georgia, serif', lineHeight: 1 }}>"</div>
                            <p style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.9, color: '#374151', fontStyle: 'italic', marginBottom: 24 }}>
                                Euphoric Tours doesn't just book trips; they craft experiences that change the way you see the world. Every detail of our Kyoto journey was handled with such care that we felt more like guests of the city than tourists.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 2, height: 28, background: '#22c55e' }} />
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>Julian Voss</div>
                                    <div style={{ fontSize: 12, color: '#9ca3af' }}>Global Explorer, New York</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEWSLETTER + CTA */}
            <section className="section" style={{ background: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                        <div style={{ background: '#f9fafb', borderRadius: 20, padding: 36 }}>
                            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: '#111' }}>The Curator's Digest</h3>
                            <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 20 }}>
                                Get exclusive invitations to member-only tours and high-end travel insights delivered monthly.
                            </p>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <input placeholder="Enter your email"
                                    style={{ flex: 1, padding: '10px 16px', borderRadius: 8, border: '1.5px solid #e5e7eb', outline: 'none', fontSize: 14 }} />
                                <button className="btn-green">Subscribe</button>
                            </div>
                        </div>
                        <div style={{ background: '#22c55e', borderRadius: 20, padding: 36, color: 'white' }}>
                            <div style={{ fontSize: 24, marginBottom: 12 }}>🧭</div>
                            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Plan Your Holiday</h3>
                            <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.7, marginBottom: 24 }}>
                                Tell us your dream destination, your travel style, and your dates. Our expert curators will craft a bespoke itinerary – personalised down to the smallest detail.
                            </p>
                            <Link to="/contact" style={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                                Start Planning <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}