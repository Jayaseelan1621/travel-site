import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function TravelPackages() {
    const [destinations, setDestinations] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Filter states - directly applied (no "applied" states needed)
    const [region, setRegion] = useState('All')
    const [investment, setInvestment] = useState('All')
    const [activity, setActivity] = useState('All')

    useEffect(() => {
        console.log('📦 Fetching packages...')
        api.get('/packages')
            .then(res => {
                console.log('✅ Packages loaded:', res.data.length)
                const mapped = res.data.map(pkg => ({
                    id: pkg.id,
                    name: pkg.title,
                    price: pkg.price,
                    priceNum: parsePrice(pkg.price),
                    tag: pkg.category?.toUpperCase() || 'PACKAGE',
                    desc: pkg.overview || '',
                    img: pkg.cover_image
                        ? pkg.cover_image.startsWith('http')
                            ? pkg.cover_image
                            : `http://localhost:5000/uploads/${pkg.cover_image}`
                        : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=320&fit=crop',
                    duration: pkg.duration,
                    destination: pkg.destination,
                    category: pkg.category,
                    originalData: pkg
                }))
                setDestinations(mapped)
                setError(null)
                setLoading(false)
            })
            .catch(err => {
                console.error('❌ Error:', err.message)
                setError(err.message || 'Failed to load packages.')
                setLoading(false)
            })
    }, [])

    // Extract numeric price from string like "₹2,999 per person"
    function parsePrice(priceStr) {
        if (!priceStr) return 0
        const num = priceStr.replace(/[^0-9]/g, '')
        return parseInt(num) || 0
    }

    // Reset all filters
    function resetFilters() {
        setRegion('All')
        setInvestment('All')
        setActivity('All')
    }

    // Filter logic - INSTANT (no need for "Refine" button)
    const filtered = destinations.filter(d => {
        // Category filter
        if (region !== 'All' && d.category !== region) return false

        // Price filter
        if (investment !== 'All') {
            const price = d.priceNum
            if (investment === 'Under ₹5,000' && price >= 5000) return false
            if (investment === '₹5,000 - ₹15,000' && (price < 5000 || price > 15000)) return false
            if (investment === '₹15,000 - ₹30,000' && (price < 15000 || price > 30000)) return false
            if (investment === '₹30,000+' && price < 30000) return false
        }

        return true
    })

    const hasActiveFilters = region !== 'All' || investment !== 'All' || activity !== 'All'

    if (loading) return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
            <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✈️</div>
                <p style={{ fontSize: 16 }}>Loading packages...</p>
            </div>
        </div>
    )

    if (error) return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
            <div style={{ textAlign: 'center', color: '#dc2626', maxWidth: 500 }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>❌</div>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#111' }}>Error Loading Packages</h2>
                <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{error}</p>
                <button onClick={() => window.location.reload()} style={{
                    background: '#22c55e', color: 'white', border: 'none', padding: '10px 20px',
                    borderRadius: 8, fontWeight: 600, cursor: 'pointer'
                }}>🔄 Retry</button>
            </div>
        </div>
    )

    return (
        <div style={{ background: '#ffffff', minHeight: '100vh' }}>
            <style>{`
        .pkg-hero-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 48px; align-items: center;
        }
        .pkg-hero-img { display: block; }
        .pkg-filter-bar {
          display: flex; align-items: center; background: white;
          border-radius: 16px; padding: 16px 24px;
          border: 1.5px solid #e5e7eb;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06); gap: 0;
        }
        .pkg-filter-item { flex: 1; padding: 0 20px 0 0; border-right: 1px solid #e5e7eb; }
        .pkg-filter-item.mid { padding: 0 20px; }
        .pkg-filter-item.last { border-right: none; padding: 0 0 0 20px; }
        .pkg-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .pkg-bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .pkg-card { transition: transform 0.3s, box-shadow 0.3s; }
        .pkg-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.12) !important; }
        @media (max-width: 768px) {
          .pkg-hero-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .pkg-hero-img { display: none !important; }
          .pkg-filter-bar { flex-direction: column !important; align-items: stretch !important; padding: 16px !important; }
          .pkg-filter-item, .pkg-filter-item.mid, .pkg-filter-item.last {
            padding: 12px 0 !important; border-right: none !important;
            border-bottom: 1px solid #e5e7eb !important;
          }
          .pkg-filter-item.last { border-bottom: none !important; }
          .pkg-cards-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .pkg-bottom-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .pkg-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

            {/* HERO */}
            <section style={{ padding: '60px 5vw 40px' }}>
                <div className="pkg-hero-grid">
                    <div>
                        <div style={{
                            background: '#f59e0b', color: 'white', fontSize: 11, fontWeight: 700,
                            letterSpacing: 2, padding: '6px 16px', borderRadius: 20,
                            display: 'inline-block', marginBottom: 28
                        }}>OUR PACKAGES · EXPLORE THE WORLD</div>
                        <h1 style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 800, color: '#9ca3af', lineHeight: 1.15, margin: 0 }}>
                            The world is waiting.
                        </h1>
                        <h1 style={{
                            fontSize: 'clamp(26px, 4vw, 54px)', fontWeight: 900,
                            fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
                            color: '#22c55e', lineHeight: 1.2, marginBottom: 24, marginTop: 0
                        }}>
                            Your itinerary is ready.
                        </h1>
                        <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.8, maxWidth: 420, margin: 0 }}>
                            Explore our curated collection of travel packages — crafted for every kind of traveler, every kind of dream, and every corner of the world worth discovering.
                        </p>
                    </div>
                    <div className="pkg-hero-img" style={{ borderRadius: 24, overflow: 'hidden', height: 340, boxShadow: '0 4px 30px rgba(0,0,0,0.1)' }}>
                        <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=340&fit=crop"
                            alt="travel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
            </section>

            {/* FILTER BAR */}
            <section style={{ padding: '0 5vw 40px' }}>
                <div className="pkg-filter-bar">
                    <div className="pkg-filter-item">
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: '#9ca3af', marginBottom: 4 }}>CATEGORY</div>
                        <select value={region} onChange={e => {
                            console.log('🔍 Filter by region:', e.target.value)
                            setRegion(e.target.value)
                        }}
                            style={{ border: 'none', outline: 'none', fontSize: 15, fontWeight: 600, color: '#111', background: 'transparent', cursor: 'pointer', width: '100%' }}>
                            <option value="All">All Categories</option>
                            <option>Domestic</option>
                            <option>International</option>
                            <option>Pilgrimage</option>
                            <option>Honeymoon</option>
                            <option>Adventure</option>
                            <option>School Package</option>
                            <option>Corporate</option>
                        </select>
                    </div>

                    <div className="pkg-filter-item mid">
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: '#9ca3af', marginBottom: 4 }}>INVESTMENT RANGE</div>
                        <select value={investment} onChange={e => {
                            console.log('💰 Filter by investment:', e.target.value)
                            setInvestment(e.target.value)
                        }}
                            style={{ border: 'none', outline: 'none', fontSize: 15, fontWeight: 600, color: '#111', background: 'transparent', cursor: 'pointer', width: '100%' }}>
                            <option value="All">All Budgets</option>
                            <option>Under ₹5,000</option>
                            <option>₹5,000 - ₹15,000</option>
                            <option>₹15,000 - ₹30,000</option>
                            <option>₹30,000+</option>
                        </select>
                    </div>

                    <div className="pkg-filter-item last">
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: '#9ca3af', marginBottom: 4 }}>CORE ACTIVITY</div>
                        <select value={activity} onChange={e => {
                            console.log('🏃 Filter by activity:', e.target.value)
                            setActivity(e.target.value)
                        }}
                            style={{ border: 'none', outline: 'none', fontSize: 15, fontWeight: 600, color: '#111', background: 'transparent', cursor: 'pointer', width: '100%' }}>
                            <option value="All">All Activities</option>
                            <option>Adventure</option>
                            <option>Cultural</option>
                            <option>Wellness</option>
                            <option>Safari</option>
                            <option>Beach</option>
                        </select>
                    </div>

                    {/* Only show Reset button if filters are active */}
                    {hasActiveFilters && (
                        <button onClick={resetFilters} style={{
                            background: '#fef2f2', color: '#ef4444', border: '1.5px solid #fee2e2',
                            padding: '14px 16px', borderRadius: 10, fontWeight: 700,
                            cursor: 'pointer', fontSize: 13, whiteSpace: 'nowrap', marginLeft: 16, flexShrink: 0
                        }}>✕ Reset Filters</button>
                    )}
                </div>

                {/* Active filter tags */}
                {hasActiveFilters && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: '#9ca3af' }}>Active filters:</span>
                        {region !== 'All' && (
                            <span style={{ background: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                                📂 {region}
                            </span>
                        )}
                        {investment !== 'All' && (
                            <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                                💰 {investment}
                            </span>
                        )}
                        {activity !== 'All' && (
                            <span style={{ background: '#fef9c3', color: '#854d0e', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                                🏃 {activity}
                            </span>
                        )}
                        <span style={{ fontSize: 13, color: '#6b7280' }}>
                            — {filtered.length} package{filtered.length !== 1 ? 's' : ''} found
                        </span>
                    </div>
                )}
            </section>

            {/* CARDS */}
            {filtered.length === 0 ? (
                <section style={{ padding: '0 5vw 60px' }}>
                    <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f9fafb', borderRadius: 20, color: '#9ca3af' }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#374151' }}>No packages found</h3>
                        <p style={{ marginBottom: 16 }}>No packages match your current filters.</p>
                        <button onClick={resetFilters} style={{
                            background: '#22c55e', color: 'white', border: 'none',
                            padding: '10px 24px', borderRadius: 10, fontWeight: 700, cursor: 'pointer'
                        }}>Reset Filters</button>
                    </div>
                </section>
            ) : (
                <>
                    {/* Row 1 — first 3 */}
                    <section style={{ padding: '0 5vw 24px' }}>
                        <div className="pkg-cards-grid">
                            {filtered.slice(0, 3).map(d => (
                                <div key={d.id} className="pkg-card" style={{
                                    borderRadius: 20, overflow: 'hidden', background: 'white',
                                    height: 500, border: '1px solid #f3f4f6',
                                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)', cursor: 'pointer',
                                }}>
                                    <div style={{ position: 'relative' }}>
                                        <img src={d.img} alt={d.name}
                                            style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }} />
                                        <div style={{
                                            position: 'absolute', top: 14, left: 14,
                                            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
                                            color: 'white', fontSize: 10, fontWeight: 700,
                                            letterSpacing: 1.5, padding: '5px 12px', borderRadius: 20,
                                            border: '1px solid rgba(255,255,255,0.2)'
                                        }}>{d.tag}</div>
                                    </div>
                                    <div style={{ padding: '18px 20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <h3 style={{ color: '#22c55e', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{d.name}</h3>
                                                <div style={{ display: 'flex', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                                                    {d.duration && <span style={{ fontSize: 12, color: '#9ca3af' }}>📅 {d.duration}</span>}
                                                    {d.destination && <span style={{ fontSize: 12, color: '#9ca3af' }}>📍 {d.destination}</span>}
                                                </div>
                                                <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.5 }}>
                                                    {d.desc?.slice(0, 80)}{d.desc?.length > 80 ? '...' : ''}
                                                </p>
                                            </div>
                                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 2 }}>Starting at</div>
                                                <div style={{ color: '#22c55e', fontWeight: 800, fontSize: 15 }}>{d.price}</div>
                                            </div>
                                        </div>
                                        <Link to={`/packages/${d.id}`} state={{ package: d.originalData }}>
                                            <button style={{
                                                width: '100%', background: 'white', color: '#111',
                                                border: '1.5px solid #e5e7eb', padding: '10px', borderRadius: 10,
                                                fontWeight: 600, fontSize: 14, cursor: 'pointer', marginTop: 14
                                            }}>View Itinerary →</button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Row 2+ — remaining */}
                    {filtered.length > 3 && (
                        <section style={{ padding: '0 5vw 60px' }}>
                            <div className="pkg-cards-grid">
                                {filtered.slice(3).map(d => (
                                    <div key={d.id} className="pkg-card" style={{
                                        borderRadius: 20, overflow: 'hidden', background: 'white',
                                        border: '1px solid #f3f4f6',
                                        boxShadow: '0 2px 16px rgba(0,0,0,0.06)', cursor: 'pointer',
                                    }}>
                                        <div style={{ position: 'relative' }}>
                                            <img src={d.img} alt={d.name}
                                                style={{ width: '100%', height: 240, objectFit: 'cover', display: 'block' }} />
                                            <div style={{
                                                position: 'absolute', top: 14, left: 14,
                                                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
                                                color: 'white', fontSize: 10, fontWeight: 700,
                                                letterSpacing: 1.5, padding: '5px 12px', borderRadius: 20,
                                                border: '1px solid rgba(255,255,255,0.2)'
                                            }}>{d.tag}</div>
                                        </div>
                                        <div style={{ padding: '18px 20px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <h3 style={{ color: '#22c55e', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{d.name}</h3>
                                                    <div style={{ display: 'flex', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                                                        {d.duration && <span style={{ fontSize: 12, color: '#9ca3af' }}>📅 {d.duration}</span>}
                                                        {d.destination && <span style={{ fontSize: 12, color: '#9ca3af' }}>📍 {d.destination}</span>}
                                                    </div>
                                                    <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.5 }}>
                                                        {d.desc?.slice(0, 80)}{d.desc?.length > 80 ? '...' : ''}
                                                    </p>
                                                </div>
                                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                    <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 2 }}>Starting at</div>
                                                    <div style={{ color: '#22c55e', fontWeight: 800, fontSize: 15 }}>{d.price}</div>
                                                </div>
                                            </div>
                                            <Link to={`/packages/${d.id}`} state={{ package: d.originalData }}>
                                                <button style={{
                                                    width: '100%', background: 'white', color: '#111',
                                                    border: '1.5px solid #e5e7eb', padding: '10px', borderRadius: 10,
                                                    fontWeight: 600, fontSize: 14, cursor: 'pointer', marginTop: 14
                                                }}>View Itinerary →</button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </>
            )}

            {/* BOTTOM */}
            <section style={{ padding: '0 5vw 80px' }}>
                <div className="pkg-bottom-grid">
                    <div style={{
                        background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 60%, #86efac 100%)',
                        borderRadius: 24, padding: '44px 40px', position: 'relative', overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, height: '55%', opacity: 0.12, background: 'radial-gradient(ellipse at 70% 100%, #166534 0%, transparent 65%)' }} />
                        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#111', marginBottom: 14, position: 'relative' }}>The Curator's Digest</h2>
                        <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.75, marginBottom: 32, position: 'relative' }}>
                            Get exclusive invitations to member-only tours and high-end travel insights delivered monthly.
                        </p>
                        <div style={{ display: 'flex', gap: 10, position: 'relative', flexWrap: 'wrap' }}>
                            <input placeholder="Enter your email" style={{
                                flex: 1, minWidth: 160, padding: '13px 18px', borderRadius: 10,
                                border: 'none', background: 'rgba(255,255,255,0.75)',
                                outline: 'none', fontSize: 14, fontFamily: 'Inter, sans-serif'
                            }} />
                            <button style={{
                                background: '#22c55e', color: 'white', border: 'none',
                                padding: '13px 22px', borderRadius: 10, fontWeight: 700,
                                cursor: 'pointer', fontSize: 14, whiteSpace: 'nowrap'
                            }}>Subscribe</button>
                        </div>
                    </div>

                    <div style={{
                        background: 'linear-gradient(145deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: 24, padding: '44px 40px', position: 'relative', overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'rgba(255,255,255,0.07)', borderRadius: '50%' }} />
                        <div style={{ position: 'absolute', bottom: -30, right: 60, width: 100, height: 100, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
                        <div style={{ width: 46, height: 46, border: '2px solid rgba(255,255,255,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 22, position: 'relative' }}>🧭</div>
                        <h2 style={{ fontSize: 26, fontWeight: 800, color: 'white', marginBottom: 14, position: 'relative' }}>Plan Your Holiday</h2>
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.85, marginBottom: 36, position: 'relative' }}>
                            Tell us your dream destination, your dates, and your travel style. Our expert curators will craft a bespoke Indian journey — personalised down to every last detail.
                        </p>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 22, position: 'relative' }}>
                            <Link to="/contact" style={{ color: 'white', fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                                Start Planning →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
