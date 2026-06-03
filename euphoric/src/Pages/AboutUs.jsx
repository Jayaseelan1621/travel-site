import { Link } from 'react-router-dom'

const values = [
    { num: '01', title: 'Personalization at the core', desc: 'No two travelers are alike. Every itinerary we design begins with listening — to your interests, your rhythm, and what you hope to feel at the end of the journey.' },
    { num: '02', title: 'Local depth, global reach', desc: 'We pair global destinations with genuine local insight — the kind that only comes from people who have been there, lived it, and know where the real magic is.' },
    { num: '03', title: 'Seamless from start to finish', desc: 'From the first enquiry to the final day of your trip, we handle every detail with care — so all you have to do is show up and be present.' },
    { num: '04', title: 'Memories, not just moments', desc: 'We measure success not by destinations visited, but by how long the experience stays with you after you\'re home.' },
]

const team = [
    { name: 'Marcus Thorne', role: 'Chief Expedition Officer', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face' },
    { name: 'Elena Rossi', role: 'Head of Cultural Integrity', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face' },
    { name: 'Julian Chen', role: 'Lead Digital Architect', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
]

export default function AboutUs() {
    return (
        <div style={{ background: '#ffffff', minHeight: '100vh' }}>
            <style>{`
        .about-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .about-hero-img { display: block; }
        .about-stats {
          display: flex;
          justify-content: center;
        }
        .about-stat-item {
          flex: 1;
          text-align: center;
          padding: 36px 20px;
          border-right: 1px solid #e5e7eb;
        }
        .about-stat-item:last-child { border-right: none; }
        .about-values-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          max-width: 900px;
          margin: 0 auto;
        }
        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .about-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 768px) {
          .about-hero-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .about-hero-img { display: none !important; }
          .about-stats { flex-direction: column !important; }
          .about-stat-item { border-right: none !important; border-bottom: 1px solid #e5e7eb !important; padding: 20px 0 !important; }
          .about-stat-item:last-child { border-bottom: none !important; }
          .about-values-grid { grid-template-columns: 1fr !important; }
          .about-team-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .about-bottom-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .about-pad { padding: 48px 16px !important; }
        }
      `}</style>

            {/* HERO — white background */}
            <section style={{ background: '#ffffff', padding: '72px 5vw 60px' }}>
                <div className="about-hero-grid">
                    <div>
                        <div style={{
                            background: '#f59e0b', color: 'white',
                            fontSize: 11, fontWeight: 700, letterSpacing: 2,
                            padding: '6px 16px', borderRadius: 20,
                            display: 'inline-block', marginBottom: 28
                        }}>EST. 2025 · ABOUT US</div>

                        <h1 style={{
                            fontSize: 'clamp(28px, 4vw, 52px)',
                            fontWeight: 800, color: '#374151',
                            lineHeight: 1.15, margin: '0 0 0'
                        }}>
                            We don't plan trips.
                        </h1>
                        <h1 style={{
                            fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900,
                            fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
                            color: '#22c55e', lineHeight: 1.2, marginBottom: 28, marginTop: 0
                        }}>
                            We craft stories.
                        </h1>
                        <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.8, maxWidth: 440 }}>
                            We don't just book trips; we architect memories. Euphoric Tours was born from a singular vision: to bring the intimacy of a local concierge to the global traveler.
                        </p>
                    </div>

                    {/* Right image */}
                    <div className="about-hero-img">
                        <div style={{
                            // borderRadius: 24, overflow: 'hidden',
                            height: 480,
                            width: 380,
                            // boxShadow: '0 8px 40px rgba(0,0,0,0.12)'
                        }}>
                            <img
                                src="/about_us.jpg"
                                alt="travel"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section style={{ background: '#f9fafb', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
                <div className="about-stats">
                    {[
                        { val: '2025', label: 'Founded with purpose' },
                        { val: '100%', label: 'Personalized itineraries' },
                        { val: '∞', label: 'Memories crafted' },
                    ].map((s) => (
                        <div key={s.val} className="about-stat-item">
                            <div style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#22c55e', marginBottom: 6 }}>{s.val}</div>
                            <div style={{ fontSize: 13, color: '#9ca3af' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* OUR STORY */}
            <section className="about-pad" style={{ padding: '80px 5vw', background: '#ffffff' }}>
                <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: '#374151', textTransform: 'uppercase', marginBottom: 16 }}>Our Story</div>
                    <h2 style={{ fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 800, color: '#111', marginBottom: 40, lineHeight: 1.2 }}>
                        Travel that feels{' '}
                        <em style={{ fontFamily: 'Playfair Display, serif', color: '#22c55e', fontStyle: 'italic' }}>genuinely yours.</em>
                    </h2>
                    {[
                        'Euphoric Tours & Travels was born from a simple but powerful belief — that travel should be more than ticking off a list of places. It should leave you changed.',
                        'Founded in 2025, we set out to build a different kind of travel company. One that listens before it plans, understands before it recommends, and designs experiences that reflect who you are — your pace, your curiosity, your idea of what a perfect day looks like.',
                        'Whether you\'re drawn to quiet coastal mornings, mountain trails at dawn, or the hum of a city you\'ve never navigated before — we build the journey around you, not the other way around.',
                        'We combine deep destination knowledge with a genuine passion for storytelling. The result? Trips that feel effortless, immersive, and unmistakably personal.',
                    ].map((p, i) => (
                        <p key={i} style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.9, marginBottom: 20 }}>{p}</p>
                    ))}
                </div>
            </section>

            {/* WHAT WE STAND FOR */}
            <section className="about-pad" style={{ padding: '80px 5vw', background: '#ffffff' }}>
                <h2 style={{ textAlign: 'center', fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#111', marginBottom: 56 }}>
                    What we stand for
                </h2>
                <div className="about-values-grid">
                    {values.map(v => (
                        <div key={v.num} style={{
                            background: 'white', borderRadius: 20,
                            padding: '32px 28px',
                            border: '1px solid #f3f4f6',
                            boxShadow: '0 2px 16px rgba(0,0,0,0.04)'
                        }}>
                            <div style={{ fontSize: 40, fontWeight: 900, color: '#dcfce7', marginBottom: 12, lineHeight: 1 }}>{v.num}</div>
                            <h3 style={{ fontWeight: 700, fontSize: 16, color: '#111', marginBottom: 10 }}>{v.title}</h3>
                            <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.75 }}>{v.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* THE CURATORS */}
            <section className="about-pad" style={{ padding: '80px 5vw', background: '#e5e7eb' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: '#111', marginBottom: 8 }}>
                        The Curators
                    </h2>
                    <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 48 }}>The restless minds behind your next great escape.</p>
                    <div className="about-team-grid">
                        {team.map(m => (
                            <div key={m.name} style={{
                                background: 'white', borderRadius: 20, overflow: 'hidden',
                                boxShadow: '0 2px 20px rgba(0,0,0,0.06)'
                            }}>
                                <img
                                    src={m.img} alt={m.name}
                                    style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }}
                                />
                                <div style={{ padding: '20px 22px' }}>
                                    <h3 style={{ fontWeight: 700, fontSize: 17, color: '#111', marginBottom: 4 }}>{m.name}</h3>
                                    <p style={{ fontSize: 13, color: '#22c55e', fontWeight: 600 }}>{m.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BOTTOM */}
            <section className="about-pad" style={{ padding: '60px 5vw 80px', background: '#ffffff' }}>
                <div className="about-bottom-grid">

                    {/* Curator's Digest */}
                    <div style={{
                        background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 60%, #86efac 100%)',
                        borderRadius: 24, padding: '44px 40px', position: 'relative', overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, height: '55%', opacity: 0.12, background: 'radial-gradient(ellipse at 70% 100%, #166534 0%, transparent 65%)' }} />
                        <h2 style={{ fontSize: 26, fontWeight: 800, color: '#111', marginBottom: 14, position: 'relative' }}>
                            The Curator's Digest
                        </h2>
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

                    {/* Plan Your Holiday */}
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