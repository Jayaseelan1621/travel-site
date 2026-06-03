import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
    { path: '/', label: '📊 Dashboard', exact: true },
    { path: '/packages', label: '📦 Packages' },
    { path: '/gallery', label: '🖼️ Gallery' },
    { path: '/enquiries', label: '📩 Enquiries' },
]

export default function Layout() {
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(true)

    function logout() {
        localStorage.removeItem('admin_token')
        navigate('/login')
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>

            {/* Sidebar */}
            <aside style={{
                width: sidebarOpen ? 240 : 0,
                background: '#fafeffff',
                color: 'white',
                transition: 'width 0.3s',
                overflow: 'hidden',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Logo */}
                <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#22c55e' }}>EUPHORIC</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', letterSpacing: 1 }}>ADMIN PANEL</div>
                </div>

                {/* Nav Links */}
                <nav style={{ flex: 1, padding: '16px 12px' }}>
                    {navItems.map(item => (
                        <NavLink key={item.path} to={item.path} end={item.exact}
                            style={({ isActive }) => ({
                                display: 'block', padding: '11px 16px', borderRadius: 10,
                                marginBottom: 4, fontSize: 14, fontWeight: 500,
                                color: isActive ? 'white' : '#9ca3af',
                                background: isActive ? '#22c55e' : 'transparent',
                                transition: 'all 0.2s'
                            })}>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <button onClick={logout} style={{
                        width: '100%', padding: '10px 16px', borderRadius: 10,
                        background: 'rgba(239,68,68,0.15)', color: '#ef4444',
                        border: '1px solid rgba(239,68,68,0.3)', fontSize: 14, fontWeight: 600
                    }}>🚪 Logout</button>
                </div>
            </aside>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                {/* Top bar */}
                <header style={{
                    background: 'white', borderBottom: '1px solid #e5e7eb',
                    padding: '0 24px', height: 60,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
                        background: 'none', border: 'none', fontSize: 20, color: '#6b7280'
                    }}>☰</button>
                    <div style={{ fontSize: 13, color: '#6b7280' }}>
                        Welcome, <strong style={{ color: '#111' }}>Admin</strong>
                    </div>
                </header>

                {/* Page Content */}
                <main style={{ flex: 1, overflow: 'auto', padding: 24, background: '#f8fafc' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}