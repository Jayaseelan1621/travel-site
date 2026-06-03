import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import api from '../api'

export default function PackageDetail() {
    const { id } = useParams()
    const location = useLocation()
    const [pkg, setPkg] = useState(location.state?.package || null)
    const [loading, setLoading] = useState(!location.state?.package)

    useEffect(() => {
        if (!pkg) {
            api.get(`/packages/${id}`)
                .then(res => { setPkg(res.data); setLoading(false) })
                .catch(() => setLoading(false))
        }
    }, [id])

    if (loading) return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✈️</div>
                <p>Loading package details...</p>
            </div>
        </div>
    )

    if (!pkg) return (
        <div style={{ textAlign: 'center', padding: 80 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>😕</div>
            <h2 style={{ color: '#111', marginBottom: 8 }}>Package not found</h2>
            <Link to="/packages" style={{ color: '#22c55e', fontWeight: 600 }}>← Back to Packages</Link>
        </div>
    )

    // Parse JSON fields safely
    let highlights = [], itinerary = [], inclusions = [], exclusions = [], terms = []

    try { highlights = JSON.parse(pkg.highlights) } catch {
        highlights = pkg.highlights?.split('\n').filter(Boolean) || []
    }
    try {
        const parsed = JSON.parse(pkg.itinerary)
        itinerary = Array.isArray(parsed) ? parsed : []
    } catch { itinerary = [] }
    try { inclusions = JSON.parse(pkg.inclusions) } catch {
        inclusions = pkg.inclusions?.split('\n').filter(Boolean) || []
    }
    try { exclusions = JSON.parse(pkg.exclusions) } catch {
        exclusions = pkg.exclusions?.split('\n').filter(Boolean) || []
    }
    try { terms = JSON.parse(pkg.terms) } catch {
        terms = pkg.terms?.split('\n').filter(Boolean) || []
    }

    const coverImg = pkg.cover_image
        ? pkg.cover_image.startsWith('http')
            ? pkg.cover_image
            : `http://localhost:5000/uploads/${pkg.cover_image}`
        : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=500&fit=crop'

    // Gallery images
    let galleryImgs = []
    try {
        const parsed = JSON.parse(pkg.gallery_images)
        galleryImgs = Array.isArray(parsed) ? parsed : []
    } catch { galleryImgs = [] }

    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <style>{`
        .detail-main { display: grid; grid-template-columns: 1fr 340px; gap: 40px; align-items: start; }
        .detail-inc { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .detail-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .detail-highlights { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .terms-list { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .term-item { display: flex; gap: 12px; align-items: flex-start; }
        @media (max-width: 900px) {
          .detail-main { grid-template-columns: 1fr !important; }
          .detail-inc { grid-template-columns: 1fr !important; }
          .detail-gallery { grid-template-columns: repeat(2, 1fr) !important; }
          .detail-highlights { grid-template-columns: 1fr !important; }
          .terms-list { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .detail-gallery { grid-template-columns: 1fr !important; }
        }
      `}</style>

            {/* HERO IMAGE */}
            <section style={{ position: 'relative', height: 460, overflow: 'hidden' }}>
                <img src={coverImg} alt={pkg.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} />

                {/* Back button */}
                <Link to="/packages" style={{
                    position: 'absolute', top: 24, left: '5vw',
                    background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                    color: 'white', padding: '8px 18px', borderRadius: 20,
                    fontWeight: 600, fontSize: 14, textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.3)'
                }}>← Back</Link>

                {/* Info overlay */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 5vw' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                        {pkg.category && (
                            <span style={{ background: '#f59e0b', color: 'white', fontSize: 11, fontWeight: 700, padding: '5px 14px', borderRadius: 20 }}>
                                {pkg.category}
                            </span>
                        )}
                        {pkg.duration && (
                            <span style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', color: 'white', fontSize: 12, padding: '5px 14px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.3)' }}>
                                📅 {pkg.duration}
                            </span>
                        )}
                        {pkg.destination && (
                            <span style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', color: 'white', fontSize: 12, padding: '5px 14px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.3)' }}>
                                📍 {pkg.destination}
                            </span>
                        )}
                    </div>
                    <h1 style={{ color: 'white', fontSize: 'clamp(22px, 4vw, 44px)', fontWeight: 800, marginBottom: 10, lineHeight: 1.2 }}>
                        {pkg.title}
                    </h1>
                    <div style={{ color: '#22c55e', fontSize: 28, fontWeight: 900 }}>{pkg.price}</div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section style={{ padding: '48px 5vw 80px', maxWidth: 1200, margin: '0 auto' }}>
                <div className="detail-main">

                    {/* LEFT COLUMN */}
                    <div>

                        {/* Overview */}
                        {pkg.overview && (
                            <div style={{ marginBottom: 44 }}>
                                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    📋 Overview
                                </h2>
                                <p style={{ color: '#6b7280', lineHeight: 1.9, fontSize: 15 }}>{pkg.overview}</p>
                            </div>
                        )}

                        {/* Highlights */}
                        {highlights.length > 0 && (
                            <div style={{ marginBottom: 44 }}>
                                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 20 }}>✨ Highlights</h2>
                                <div className="detail-highlights">
                                    {highlights.map((h, i) => (
                                        <div key={i} style={{
                                            display: 'flex', gap: 10, alignItems: 'flex-start',
                                            background: '#f0fdf4', padding: '12px 14px', borderRadius: 10
                                        }}>
                                            <span style={{ color: '#22c55e', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>✓</span>
                                            <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>{h}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Itinerary */}
                        {itinerary.length > 0 && (
                            <div style={{ marginBottom: 44 }}>
                                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 24 }}>🗓️ Itinerary</h2>
                                <div style={{ position: 'relative' }}>
                                    {itinerary.map((item, i) => (
                                        <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
                                            {/* Timeline */}
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                                                <div style={{
                                                    width: 40, height: 40, borderRadius: '50%',
                                                    background: '#22c55e', color: 'white',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: 14, fontWeight: 700
                                                }}>{i + 1}</div>
                                                {i < itinerary.length - 1 && (
                                                    <div style={{ width: 2, flex: 1, background: '#e5e7eb', minHeight: 24, marginTop: 4 }} />
                                                )}
                                            </div>
                                            {/* Content */}
                                            <div style={{
                                                flex: 1, background: '#f9fafb', borderRadius: 14,
                                                padding: '14px 18px', marginBottom: 12,
                                                border: '1px solid #f3f4f6'
                                            }}>
                                                {item.time && (
                                                    <div style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', marginBottom: 4, letterSpacing: 0.5 }}>
                                                        🕐 {item.time}
                                                    </div>
                                                )}
                                                <div style={{ fontSize: 15, color: '#111', fontWeight: 500 }}>
                                                    {item.activity}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Inclusions & Exclusions */}
                        {(inclusions.length > 0 || exclusions.length > 0) && (
                            <div style={{ marginBottom: 44 }}>
                                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 20 }}>📦 What's Included</h2>
                                <div className="detail-inc">
                                    {inclusions.length > 0 && (
                                        <div style={{ background: '#f0fdf4', borderRadius: 16, padding: '24px' }}>
                                            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#16a34a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                                                ✅ Inclusions
                                            </h3>
                                            {inclusions.map((item, i) => (
                                                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                                                    <span style={{ color: '#22c55e', fontWeight: 700, flexShrink: 0 }}>•</span>
                                                    <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {exclusions.length > 0 && (
                                        <div style={{ background: '#fef2f2', borderRadius: 16, padding: '24px' }}>
                                            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#dc2626', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                                                ❌ Exclusions
                                            </h3>
                                            {exclusions.map((item, i) => (
                                                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                                                    <span style={{ color: '#ef4444', fontWeight: 700, flexShrink: 0 }}>•</span>
                                                    <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Gallery */}
                        {galleryImgs.length > 0 && (
                            <div style={{ marginBottom: 44 }}>
                                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111', marginBottom: 20 }}>🖼️ Gallery</h2>
                                <div className="detail-gallery">
                                    {galleryImgs.map((img, i) => (
                                        <div key={i} style={{ borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3' }}>
                                            <img
                                                src={img.startsWith('http') ? img : `http://localhost:5000/uploads/${img}`}
                                                alt={`Gallery ${i + 1}`}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }}
                                                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                                                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Terms & Conditions - IMPROVED */}
                        {terms.length > 0 && (
                            <div style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', borderRadius: 20, padding: '32px', border: '1.5px solid #fcd34d', marginTop: 44 }}>
                                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#92400e', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
                                    📜 Terms & Conditions
                                </h2>
                                <div className="terms-list">
                                    {terms.map((item, i) => (
                                        <div key={i} className="term-item" style={{
                                            background: 'rgba(255,255,255,0.6)',
                                            padding: '14px 16px',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(253, 224, 71, 0.3)',
                                            backdropFilter: 'blur(4px)'
                                        }}>
                                            <div style={{
                                                width: 28, height: 28,
                                                background: '#fcd34d',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 700,
                                                color: '#92400e',
                                                flexShrink: 0,
                                                fontSize: 12
                                            }}>
                                                {i + 1}
                                            </div>
                                            <span style={{
                                                fontSize: 13,
                                                color: '#78350f',
                                                lineHeight: 1.6,
                                                fontWeight: 500
                                            }}>
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* RIGHT COLUMN — Sticky booking card */}
                    <div style={{ position: 'sticky', top: 90 }}>
                        <div style={{
                            background: 'white', borderRadius: 24, padding: 28,
                            boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
                            border: '1px solid #f3f4f6'
                        }}>
                            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 4 }}>Book This Package</h3>
                            <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 20 }}>Get a personalized quote from our curators</p>

                            <div style={{ fontSize: 32, fontWeight: 900, color: '#22c55e', marginBottom: 4 }}>{pkg.price}</div>
                            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 24 }}>per person / per vehicle</p>

                            {/* Package details */}
                            <div style={{ borderRadius: 12, border: '1px solid #f3f4f6', overflow: 'hidden', marginBottom: 24 }}>
                                {[
                                    { icon: '📅', label: 'Duration', value: pkg.duration },
                                    { icon: '📍', label: 'Destination', value: pkg.destination },
                                    { icon: '🏷️', label: 'Category', value: pkg.category },
                                ].filter(item => item.value).map((item, i, arr) => (
                                    <div key={item.label} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '12px 16px',
                                        borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none',
                                        background: i % 2 === 0 ? '#fafafa' : 'white'
                                    }}>
                                        <span style={{ fontSize: 13, color: '#9ca3af' }}>{item.icon} {item.label}</span>
                                        <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Enquire button */}
                            <Link to={`/contact?package=${encodeURIComponent(pkg.title)}`} style={{ textDecoration: 'none' }}>
                                <button style={{
                                    width: '100%', background: '#22c55e', color: 'white',
                                    border: 'none', padding: '16px', borderRadius: 14,
                                    fontWeight: 700, fontSize: 16, cursor: 'pointer', marginBottom: 10,
                                    transition: 'background 0.2s'
                                }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#22c55e'}
                                >
                                    📩 Enquire Now
                                </button>
                            </Link>

                            <Link to="/packages" style={{ textDecoration: 'none' }}>
                                <button style={{
                                    width: '100%', background: 'white', color: '#374151',
                                    border: '1.5px solid #e5e7eb', padding: '12px', borderRadius: 12,
                                    fontWeight: 600, fontSize: 14, cursor: 'pointer'
                                }}>
                                    ← View All Packages
                                </button>
                            </Link>

                            {/* Contact info */}
                            <div style={{ marginTop: 20, padding: '16px', background: '#f0fdf4', borderRadius: 12 }}>
                                <p style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, marginBottom: 6 }}>📞 Need help?</p>
                                <p style={{ fontSize: 13, color: '#374151', marginBottom: 4 }}>+91 99949 20445</p>
                                <p style={{ fontSize: 12, color: '#6b7280' }}>euphorictourstravels@gmail.com</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}