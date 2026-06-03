import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Menu, X, ChevronDown } from 'lucide-react'

const internationalData = {
    'East': ['United Arab Emirates', 'Jordan', 'Qatar', 'Egypt', 'Israel', 'Oman', 'Turkey'],
    'Africa': ['Mauritius', 'Tanzania', 'Morocco'],
    'Europe': ['Switzerland', 'Sweden', 'Denmark', 'France', 'Norway', 'Germany', 'Austria', 'Belgium', 'Italy', 'Czech', 'Finland', 'Greenland'],
    'Europe2': ['Greece', 'UK', 'Croatia', 'Spain', 'Ireland', 'Netherlands', 'Bulgaria', 'Hungary', 'Iceland', 'Romania', 'Portugal'],
    'Asia': ['Singapore', 'Vietnam', 'Bhutan', 'South Korea', 'Maldives', 'China', 'Uzbekistan', 'Thailand', 'Japan', 'Russia'],
    'Asia2': ['Indonesia', 'Cambodia', 'Nepal', 'Armenia', 'Sri Lanka', 'Hong Kong', 'Malaysia', 'Azerbaijan', 'Georgia'],
    'Pacific': ['Australia', 'Fiji', 'New Zealand'],
    'America': ['Alaska', 'USA', 'Canada', 'South America'],
}

const domesticData = {
    'All India Packages': ['Tamil Nadu', 'Kerala', 'Jammu and Kashmir', 'Uttar Pradesh', 'Gujarat', 'Goa', 'Jharkhand', 'Andra Pradesh', 'Andaman and Nicobar Islands', 'Sikkim', 'Uttarakhand', 'Telangana', 'Bihar', 'Odisha', 'West Bengal', 'Maharashtra', 'Meghalaya', 'Karnataka', 'Pondichery', 'Himachal Pradesh', 'Rajasthan', 'Assam', 'Delhi', 'Lakshadweep', 'Ladakh'],
}

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/destinations' },
    { label: 'Travel Packages', path: '/packages' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },

]

function MegaMenu() {
    const [activeTab, setActiveTab] = useState('International')

    const data = activeTab === 'International' ? internationalData : domesticData

    // Group for international display
    const mainCols = activeTab === 'International'
        ? {
            'East': internationalData['East'],
            'Africa': internationalData['Africa'],
            'Pacific': internationalData['Pacific'],
            'America': internationalData['America'],
        }
        : domesticData

    const europeCols = activeTab === 'International'
        ? [...internationalData['Europe'], ...internationalData['Europe2']]
        : []

    const asiaCols = activeTab === 'International'
        ? [...internationalData['Asia'], ...internationalData['Asia2']]
        : []

    return (
        <div style={{
            position: 'absolute', top: '100%', left: '50%',
            transform: 'translateX(-50%)',
            background: 'white', borderRadius: 16,
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            border: '1px solid #f3f4f6',
            zIndex: 300, marginTop: 8,
            width: activeTab === 'International' ? 860 : 680,
            padding: '24px 28px',
        }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
                {['International', 'Domestic', 'Pilgrimage'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} style={{
                        padding: '8px 28px', borderRadius: 24, border: '1.5px solid #e5e7eb',
                        cursor: 'pointer', fontSize: 14, fontWeight: 600,
                        background: activeTab === tab ? '#f59e0b' : 'white',
                        color: activeTab === tab ? 'white' : '#374151',
                        transition: 'all 0.2s'
                    }}>{tab}</button>
                ))}
            </div>

            {/* International Content */}
            {activeTab === 'International' && (
                <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: 24 }}>
                    {/* Left: East, Africa, Pacific, America */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {Object.entries(mainCols).map(([region, countries]) => (
                            <div key={region}>
                                <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{region}</div>
                                {countries.map(c => (
                                    <div key={c} style={{ fontSize: 13, color: '#374151', marginBottom: 5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#22c55e'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#374151'}>
                                        • {c}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Middle: Europe */}
                    <div>
                        <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Europe</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
                            {europeCols.map(c => (
                                <div key={c} style={{ fontSize: 13, color: '#374151', marginBottom: 5, cursor: 'pointer' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#22c55e'}
                                    onMouseLeave={e => e.currentTarget.style.color = '#374151'}>
                                    • {c}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Asia + image */}
                    <div>
                        <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Asia</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px', marginBottom: 16 }}>
                            {asiaCols.map(c => (
                                <div key={c} style={{ fontSize: 13, color: '#374151', marginBottom: 5, cursor: 'pointer' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#22c55e'}
                                    onMouseLeave={e => e.currentTarget.style.color = '#374151'}>
                                    • {c}
                                </div>
                            ))}
                        </div>
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=220&h=120&fit=crop" alt="travel" style={{ width: '100%', borderRadius: 10, objectFit: 'cover', height: 100 }} />
                    </div>
                </div>
            )}

            {/* Domestic Content */}
            {activeTab === 'Domestic' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 28, alignItems: 'start' }}>
                    <div>
                        <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>All India Packages</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px 12px' }}>
                            {domesticData['All India Packages'].map(c => (
                                <div key={c} style={{ fontSize: 13, color: '#374151', marginBottom: 6, cursor: 'pointer' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#22c55e'}
                                    onMouseLeave={e => e.currentTarget.style.color = '#374151'}>
                                    • {c}
                                </div>
                            ))}
                        </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=200&h=180&fit=crop" alt="india" style={{ width: 180, borderRadius: 10, objectFit: 'cover' }} />
                </div>
            )}

            {/* Pilgrimage Content */}
            {activeTab === 'Pilgrimage' && (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#9ca3af', fontSize: 15 }}>
                    🛕 Pilgrimage packages coming soon...
                </div>
            )}
        </div>
    )
}

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [showMega, setShowMega] = useState(false)
    const [mobileSubmenu, setMobileSubmenu] = useState(null)
    const { pathname } = useLocation()

    return (
        <nav style={{
            position: 'sticky', top: 0, zIndex: 100,
            background: 'white', borderBottom: '1px solid #f3f4f6',
            padding: '0 24px'
        }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', height: 70, gap: 32 }}>

                {/* Logo with Image */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, textDecoration: 'none' }}>
                    <img
                        src="/logo.png"
                        alt="Euphoric Tours & Travels"
                        style={{ width: 64, height: 64, objectFit: 'contain' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                        <span style={{ fontSize: 16, fontWeight: 900, color: '#22c55e', letterSpacing: 1 }}>EUPHORIC</span>
                        <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280', letterSpacing: 1.5 }}>TOURS & TRAVELS</span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hide-mobile" style={{ display: 'flex', gap: 4, flex: 1, justifyContent: 'center', position: 'relative' }}>
                    {navLinks.map(l => (
                        <div key={l.path} style={{ position: 'relative' }}
                            onMouseEnter={() => l.hasMega && setShowMega(true)}
                            onMouseLeave={() => l.hasMega && setShowMega(false)}
                        >
                            <Link to={l.path} style={{
                                padding: '8px 16px', fontSize: 15, fontWeight: 500,
                                color: pathname === l.path ? '#22c55e' : '#4b5563',
                                borderBottom: pathname === l.path ? '2px solid #22c55e' : '2px solid transparent',
                                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 4
                            }}>
                                {l.label}
                                {l.hasMega && <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: showMega ? 'rotate(180deg)' : 'rotate(0deg)' }} />}
                            </Link>

                            {/* Mega Menu */}
                            {l.hasMega && showMega && <MegaMenu />}
                        </div>
                    ))}
                </div>

                {/* Right - Search & Button */}
                <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
                    <Search size={20} color="#6b7280" style={{ cursor: 'pointer' }} />
                    <Link to="/contact">
                        <button style={{
                            background: '#22c55e',
                            color: 'white',
                            border: 'none',
                            padding: '10px 24px',
                            borderRadius: 8,
                            fontSize: 15,
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                            onMouseOver={(e) => {
                                e.target.style.background = '#16a34a'
                                e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)'
                            }}
                            onMouseOut={(e) => {
                                e.target.style.background = '#22c55e'
                                e.target.style.boxShadow = 'none'
                            }}>
                            Plan Your Journey
                        </button>
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button onClick={() => setOpen(!open)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer' }} className="mobile-menu-btn">
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div style={{ background: 'white', padding: '16px 24px 24px', borderTop: '1px solid #f3f4f6' }}>
                    {navLinks.map(l => (
                        <div key={l.path}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6' }}>
                                <Link to={l.path} onClick={() => { if (!l.hasMega) setOpen(false) }} style={{ display: 'block', padding: '12px 0', fontSize: 16, fontWeight: 500, color: pathname === l.path ? '#22c55e' : '#374151', flex: 1 }}>{l.label}</Link>
                                {l.hasMega && (
                                    <button onClick={() => setMobileSubmenu(mobileSubmenu === l.label ? null : l.label)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
                                        <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: mobileSubmenu === l.label ? 'rotate(180deg)' : 'rotate(0deg)', color: '#22c55e' }} />
                                    </button>
                                )}
                            </div>
                            {l.hasMega && mobileSubmenu === l.label && (
                                <div style={{ background: '#f9fafb', borderRadius: 8, margin: '4px 0 8px', padding: '12px 16px' }}>
                                    {['International', 'Domestic', 'Pilgrimage'].map(tab => (
                                        <Link key={tab} to={`/services?type=${tab.toLowerCase()}`} onClick={() => setOpen(false)} style={{ display: 'block', padding: '9px 0', fontSize: 15, color: '#374151', fontWeight: 500, borderBottom: '1px solid #f3f4f6' }}>
                                            {tab === 'International' ? '✈️' : tab === 'Domestic' ? '🏠' : '🛕'} {tab}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <Link to="/contact" onClick={() => setOpen(false)}>
                        <button style={{
                            background: '#22c55e',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: 8,
                            fontSize: 15,
                            fontWeight: 600,
                            cursor: 'pointer',
                            marginTop: 16,
                            width: '100%',
                            transition: 'all 0.3s ease'
                        }}>
                            Plan Your Journey
                        </button>
                    </Link>
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
        </nav>
    )
}