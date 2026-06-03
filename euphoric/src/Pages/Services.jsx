import { Link } from 'react-router-dom'

const services = [
    {
        icon: '🛂',
        title: 'Passport Assistance',
        desc: 'Your journey begins with the right documents. We guide you through the entire passport application and renewal process — from documentation and form filling to submission and follow-up. Fast, accurate, and hassle-free.'
    },
    {
        icon: '🏨',
        title: 'Hotel Booking',
        desc: 'Stay somewhere worth remembering. We curate and book accommodations that match your style, budget, and destination — from boutique stays to luxury resorts. Every property is handpicked for comfort, location, and experience.'
    },
    {
        icon: '✈️',
        title: 'Flight & Ticket Booking',
        desc: 'The best routes, the best rates. We handle all your flight, train, and transport bookings — finding the most efficient routes and best available fares, so you travel smart without the hours of searching.'
    },
    {
        icon: '🗺️',
        title: 'Travel Guide',
        desc: 'Local knowledge. Global journeys. Every trip comes with curated destination insights — the best places to visit, eat, explore, and experience. Our guides go beyond the obvious and take you where the real stories are.'
    },
    {
        icon: '🛡️',
        title: 'Travel Insurance',
        desc: 'Travel confidently, whatever happens. We help you choose the right travel insurance plan — covering medical emergencies, trip cancellations, lost baggage, and more. Because peace of mind is part of the package.'
    },
    {
        icon: '💱',
        title: 'Currency Exchange',
        desc: 'The right rates, right on time. Get competitive exchange rates and travel-ready currency before you depart. We make sure you arrive at your destination prepared — no last-minute airport counters, no hidden fees.'
    },
]

export default function Services() {
    return (
        <div style={{ background: '#ffffff', minHeight: '100vh' }}>
            <style>{`
        .srv-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .srv-hero-img { display: block; }
        .srv-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .srv-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .srv-card {
          background: #f9fafb;
          border-radius: 20px;
          padding: 32px 28px;
          border: 1px solid #f3f4f6;
          transition: box-shadow 0.2s, transform 0.2s;
          cursor: default;
        }
        .srv-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.09);
          transform: translateY(-4px);
        }
        @media (max-width: 768px) {
          .srv-hero-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .srv-hero-img { display: none !important; }
          .srv-cards-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .srv-bottom-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .srv-section { padding: 48px 16px !important; }
          .srv-hero-sec { padding: 40px 16px 32px !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .srv-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

            {/* HERO — dark only this section */}
            <section className="srv-hero-sec" style={{ background: '#f9fafb', padding: '72px 5vw 60px' }}>
                <div className="srv-hero-grid">
                    <div>
                        <div style={{
                            background: '#f59e0b', color: 'white',
                            fontSize: 11, fontWeight: 700, letterSpacing: 2,
                            padding: '6px 18px', borderRadius: 24,
                            display: 'inline-block', marginBottom: 28
                        }}>WHAT WE OFFER · BUILT FOR EVERY TRAVELER</div>

                        <h1 style={{
                            fontSize: 'clamp(28px, 4vw, 56px)',
                            fontWeight: 800, color: '#000000ff',
                            lineHeight: 1.15, margin: '0 0 4px'
                        }}>
                            We handle the details.
                        </h1>
                        <h1 style={{
                            fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 900,
                            fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
                            color: '#22c55e', lineHeight: 1.2, marginBottom: 28, marginTop: 0
                        }}>
                            You enjoy the journey.
                        </h1>
                        <p style={{ color: '#474a50ff', fontSize: 15, lineHeight: 1.8, maxWidth: 440 }}>
                            From the first document to the final boarding pass — Euphoric Tours takes care of every layer of your travel so you can focus on what matters most: the experience.
                        </p>
                    </div>

                    {/* Phone + image mockup */}
                    <div className="srv-hero-img" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{
                            width: 400, height: 500,
                            background: '#ffffffff',
                            overflow: 'hidden',

                        }}>
                            <img
                                src="/services.png"
                                alt="travel app"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR SERVICES HEADING */}
            <section className="srv-section" style={{ padding: '80px 5vw 60px', textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: '#22c55e', textTransform: 'uppercase', marginBottom: 16 }}>Our Services</div>
                <h2 style={{ fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 800, color: '#111', marginBottom: 16, lineHeight: 1.2 }}>
                    Everything your trip needs,<br />
                    <span style={{ color: '#22c55e' }}>all in one place.</span>
                </h2>
                <p style={{ color: '#404247ff', fontSize: 15, lineHeight: 1.8, maxWidth: 620, margin: '0 auto' }}>
                    Travel is more than a destination — it's a process. We've built a complete range of services so that every part of your journey, from paperwork to touchdown, is smooth, stress-free, and in expert hands.
                </p>
            </section>

            {/* SERVICE CARDS — dark bg */}
            <section style={{ background: '#f9fafb', padding: '60px 5vw 72px' }}>
                <div className="srv-cards-grid">
                    {services.map((s, i) => (
                        <div key={i} style={{
                            background: 'white',
                            borderRadius: 20, padding: '32px 28px',
                            border: '1px solid #f3f4f6',
                            transition: 'box-shadow 0.2s, transform 0.2s, background 0.2s',
                            cursor: 'default'
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'white'
                                e.currentTarget.style.transform = 'translateY(-4px)'
                                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            {/* Icon box */}
                            <div style={{
                                width: 48, height: 48,
                                background: 'rgba(34,197,94,0.15)',
                                borderRadius: 12,
                                display: 'flex', alignItems: 'center',
                                justifyContent: 'center', fontSize: 22,
                                marginBottom: 20
                            }}>{s.icon}</div>

                            <h3 style={{ fontWeight: 700, fontSize: 18, color: '#9ca3af', marginBottom: 12 }}>{s.title}</h3>
                            <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.8 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* BOTTOM — Curator's Digest + Plan Your Holiday */}
            <section style={{ padding: '60px 5vw 80px', background: '#ffffff' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>

                    {/* Curator's Digest */}
                    <div style={{
                        background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 60%, #86efac 100%)',
                        borderRadius: 24,
                        padding: '44px 40px',
                        position: 'relative',
                        overflow: 'hidden',
                        minHeight: '380px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            left: 0,
                            height: '55%',
                            opacity: 0.12,
                            background: 'radial-gradient(ellipse at 70% 100%, #166534 0%, transparent 65%)'
                        }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{
                                fontSize: 26,
                                fontWeight: 800,
                                color: '#111',
                                margin: '0 0 14px 0'
                            }}>
                                The Curator's Digest
                            </h2>
                            <p style={{
                                color: '#6b7280',
                                fontSize: 15,
                                lineHeight: 1.75,
                                margin: '0 0 32px 0'
                            }}>
                                Get exclusive invitations to member-only tours and high-end travel insights delivered monthly.
                            </p>
                        </div>

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                <input
                                    placeholder="Enter your email"
                                    style={{
                                        flex: 1,
                                        minWidth: 160,
                                        padding: '13px 18px',
                                        borderRadius: 10,
                                        border: 'none',
                                        background: 'rgba(255,255,255,0.75)',
                                        outline: 'none',
                                        fontSize: 14,
                                        fontFamily: 'Inter, sans-serif',
                                        color: '#666'
                                    }}
                                />
                                <button style={{
                                    background: '#22c55e',
                                    color: 'white',
                                    border: 'none',
                                    padding: '13px 22px',
                                    borderRadius: 10,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    fontSize: 14,
                                    whiteSpace: 'nowrap'
                                }}>
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Plan Your Holiday */}
                    <div style={{
                        background: 'linear-gradient(145deg, #15803d 0%, #22c55e 100%)',
                        borderRadius: 24,
                        padding: '44px 40px',
                        position: 'relative',
                        overflow: 'hidden',
                        minHeight: '380px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: -40,
                            right: -40,
                            width: 180,
                            height: 180,
                            background: 'rgba(255,255,255,0.07)',
                            borderRadius: '50%'
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: -30,
                            right: 60,
                            width: 100,
                            height: 100,
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '50%'
                        }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{
                                width: 46,
                                height: 46,
                                border: '2px solid rgba(255,255,255,0.6)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 20,
                                marginBottom: 22
                            }}>
                                🧭
                            </div>

                            <h2 style={{
                                fontSize: 26,
                                fontWeight: 800,
                                color: 'white',
                                margin: '0 0 14px 0'
                            }}>
                                Plan Your Holiday
                            </h2>
                            <p style={{
                                color: 'rgba(255,255,255,0.95)',
                                fontSize: 14,
                                lineHeight: 1.85,
                                margin: '0 0 36px 0'
                            }}>
                                Tell us your dream destination, your dates, and your travel style. Our expert curators will craft a bespoke Indian journey — personalised down to every last detail.
                            </p>
                        </div>

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{
                                borderTop: '1px solid rgba(255,255,255,0.3)',
                                paddingTop: 22
                            }}>
                                <a
                                    href="/contact"
                                    style={{
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: 15,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        textDecoration: 'none'
                                    }}
                                >
                                    Start Planning →
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    )
}