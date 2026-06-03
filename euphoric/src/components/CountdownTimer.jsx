import { useState, useEffect } from 'react'

export default function CountdownTimer({ targetHours = 12 }) {
    const [time, setTime] = useState({ h: targetHours, m: 8, s: 48 })

    useEffect(() => {
        const t = setInterval(() => {
            setTime(prev => {
                let { h, m, s } = prev
                s--
                if (s < 0) { s = 59; m-- }
                if (m < 0) { m = 59; h-- }
                if (h < 0) { h = 0; m = 0; s = 0 }
                return { h, m, s }
            })
        }, 1000)
        return () => clearInterval(t)
    }, [])

    const pad = n => String(n).padStart(2, '0')

    return (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {[['h', time.h], ['m', time.m], ['s', time.s]].map(([label, val]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.2)', borderRadius: 8,
                        padding: '8px 14px', fontSize: 22, fontWeight: 700,
                        color: 'white', minWidth: 52
                    }}>{pad(val)}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{label.toUpperCase()}</div>
                </div>
            ))}
        </div>
    )
}