import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const res = await api.post('/auth/login', form)
            localStorage.setItem('admin_token', res.data.token)
            navigate('/')
        } catch (err) {
            setError('Invalid username or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            minHeight: '100vh', background: '#0a1f0a',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                background: 'white', borderRadius: 20, padding: '48px 40px',
                width: '100%', maxWidth: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>
                        <img src="../logo.png" alt="Logo" height="100px" />
                    </div>
                    <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111' }}>EUPHORIC</h1>
                    <p style={{ fontSize: 12, color: '#9ca3af', letterSpacing: 1 }}>ADMIN PANEL</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', letterSpacing: 1, display: 'block', marginBottom: 6 }}>USERNAME</label>
                        <input
                            value={form.username}
                            onChange={e => setForm({ ...form, username: e.target.value })}
                            placeholder="admin"
                            required
                            style={{
                                width: '100%', padding: '12px 16px', borderRadius: 10,
                                border: '1.5px solid #e5e7eb', outline: 'none',
                                fontSize: 14, boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <label style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', letterSpacing: 1, display: 'block', marginBottom: 6 }}>PASSWORD</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            placeholder="••••••••"
                            required
                            style={{
                                width: '100%', padding: '12px 16px', borderRadius: 10,
                                border: '1.5px solid #e5e7eb', outline: 'none',
                                fontSize: 14, boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {error && (
                        <div style={{ background: '#fef2f2', color: '#ef4444', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>
                            {error}
                        </div>
                    )}

                    <button type="submit" disabled={loading} style={{
                        width: '100%', padding: '14px', borderRadius: 10,
                        background: '#22c55e', color: 'white', border: 'none',
                        fontSize: 15, fontWeight: 700
                    }}>
                        {loading ? 'Logging in...' : 'Login →'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginTop: 20 }}>
                    Default: admin / admin123
                </p>
            </div>
        </div>
    )
}