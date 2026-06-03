import { Link } from 'react-router-dom'

const footerLinks = [
    {
        title: 'MAIN SERVICES',
        items: [
            { label: 'Annual Packages', path: '/packages' },
            { label: 'Culinary Journeys', path: '/packages' },
            { label: 'Corporate Packages', path: '/packages' },
        ]
    },
    {
        title: 'QUICK LINKS',
        items: [
            { label: 'Home', path: '/' },
            { label: 'About', path: '/about' },
            { label: 'Services', path: '/destinations' },
            { label: 'Packages', path: '/packages' },
            { label: 'FAQ', path: '/faq' },

        ]
    },
    {
        title: 'SUPPORT',
        items: [
            { label: 'Contact', path: '/contact' },
            { label: 'Privacy Policy', path: '/privacy' },
            { label: 'Terms of Service', path: '/terms' },
            { label: 'Cancellation Policy', path: '/cancellation' },
        ]
    },
]

export default function Footer() {
    return (
        <footer style={{ background: '#0a1f0a', color: 'white', padding: '60px 24px 30px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>

                    {/* Brand */}
                    <div>
                        {/* Logo with Image */}
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, textDecoration: 'none' }}>
                            <img
                                src="/logo.png"
                                alt="Euphoric Tours & Travels"
                                style={{ width: 64, height: 64, objectFit: 'contain' }}
                            />
                        </Link>
                        <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.7, marginBottom: 16 }}>
                            The Digital Curator of Premium Experiences.We redefine luxury through authenticity and soul.
                        </p>
                        <div style={{ display: 'flex', gap: 12 }}>
                            {['𝕏', 'in'].map(s => (
                                <div key={s} style={{
                                    width: 32, height: 32, border: '1px solid #374151',
                                    borderRadius: 6, display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', fontSize: 13, cursor: 'pointer'
                                }}>{s}</div>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {footerLinks.map(col => (
                        <div key={col.title}>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#6b7280', marginBottom: 16 }}>
                                {col.title}
                            </div>
                            {col.items.map(item => (
                                <div key={item.label} style={{ marginBottom: 10 }}>
                                    <Link
                                        to={item.path}
                                        style={{ fontSize: 14, color: '#d1d5db', textDecoration: 'none', transition: 'color 0.2s' }}
                                        onMouseEnter={e => e.target.style.color = '#22c55e'}
                                        onMouseLeave={e => e.target.style.color = '#d1d5db'}
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ))}

                </div>

                <div style={{ borderTop: '1px solid #1f2937', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>© 2025 Euphoric Tours</p>
                    <Link to="/terms" style={{ fontSize: 13, color: '#6b7280', textDecoration: 'none' }}>All rights reserved</Link>
                </div>
            </div>
        </footer>
    )
}