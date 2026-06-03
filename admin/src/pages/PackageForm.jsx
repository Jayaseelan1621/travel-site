import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'

const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 10,
    border: '1.5px solid #e2e8f0', outline: 'none',
    fontSize: 14, boxSizing: 'border-box', fontFamily: 'Inter, sans-serif',
    background: '#f8fafc', transition: 'border-color 0.2s'
}

const labelStyle = {
    fontSize: 12, fontWeight: 700, color: '#64748b',
    letterSpacing: 1, display: 'block', marginBottom: 6
}

const cardStyle = {
    background: 'white', borderRadius: 16, padding: 28,
    marginBottom: 20, boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
    border: '1px solid #e2e8f0'
}

function DynamicList({ label, items, onChange, placeholder }) {
    function addItem() { onChange([...items, '']) }
    function updateItem(index, value) {
        const updated = [...items]
        updated[index] = value
        onChange(updated)
    }
    function removeItem(index) { onChange(items.filter((_, i) => i !== index)) }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <label style={labelStyle}>{label}</label>
                <button type="button" onClick={addItem} style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: '#22c55e', color: 'white', border: 'none',
                    padding: '5px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer'
                }}>+ Add</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input
                            value={item}
                            onChange={e => updateItem(index, e.target.value)}
                            placeholder={placeholder}
                            style={{ ...inputStyle, flex: 1 }}
                            onFocus={e => e.target.style.borderColor = '#22c55e'}
                            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                        />
                        <button type="button" onClick={() => removeItem(index)} style={{
                            width: 34, height: 34, borderRadius: 8, border: '1.5px solid #fee2e2',
                            background: '#fef2f2', color: '#ef4444', fontSize: 16,
                            cursor: 'pointer', flexShrink: 0, display: 'flex',
                            alignItems: 'center', justifyContent: 'center'
                        }}>×</button>
                    </div>
                ))}
                {items.length === 0 && (
                    <div style={{
                        padding: '16px', borderRadius: 10, border: '1.5px dashed #e2e8f0',
                        color: '#94a3b8', fontSize: 13, textAlign: 'center'
                    }}>Click "+ Add" to add items</div>
                )}
            </div>
        </div>
    )
}

function ItineraryList({ items, onChange }) {
    function addItem() { onChange([...items, { time: '', activity: '' }]) }
    function updateItem(index, field, value) {
        const updated = [...items]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }
    function removeItem(index) { onChange(items.filter((_, i) => i !== index)) }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <label style={labelStyle}>ITINERARY</label>
                <button type="button" onClick={addItem} style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: '#22c55e', color: 'white', border: 'none',
                    padding: '5px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer'
                }}>+ Add Stop</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <div style={{
                            width: 28, height: 28, borderRadius: '50%', background: '#22c55e',
                            color: 'white', fontSize: 12, fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>{index + 1}</div>
                        <input
                            value={item.time}
                            onChange={e => updateItem(index, 'time', e.target.value)}
                            placeholder="06:00 AM"
                            style={{ ...inputStyle, width: 110, flexShrink: 0 }}
                            onFocus={e => e.target.style.borderColor = '#22c55e'}
                            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                        />
                        <div style={{ color: '#94a3b8', fontWeight: 700, flexShrink: 0 }}>|</div>
                        <input
                            value={item.activity}
                            onChange={e => updateItem(index, 'activity', e.target.value)}
                            placeholder="e.g. Pickup from Salem"
                            style={{ ...inputStyle, flex: 1 }}
                            onFocus={e => e.target.style.borderColor = '#22c55e'}
                            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                        />
                        <button type="button" onClick={() => removeItem(index)} style={{
                            width: 34, height: 34, borderRadius: 8, border: '1.5px solid #fee2e2',
                            background: '#fef2f2', color: '#ef4444', fontSize: 16,
                            cursor: 'pointer', flexShrink: 0, display: 'flex',
                            alignItems: 'center', justifyContent: 'center'
                        }}>×</button>
                    </div>
                ))}
                {items.length === 0 && (
                    <div style={{
                        padding: '16px', borderRadius: 10, border: '1.5px dashed #e2e8f0',
                        color: '#94a3b8', fontSize: 13, textAlign: 'center'
                    }}>Click "+ Add Stop" to build your itinerary</div>
                )}
            </div>
        </div>
    )
}

export default function PackageForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = !!id

    // All states — component உள்ளே
    const [form, setForm] = useState({
        title: '', destination: '', duration: '', price: '',
        category: 'Domestic', overview: '',
    })
    const [highlights, setHighlights] = useState([''])
    const [itinerary, setItinerary] = useState([{ time: '', activity: '' }])
    const [inclusions, setInclusions] = useState([''])
    const [exclusions, setExclusions] = useState([''])
    const [terms, setTerms] = useState([''])
    const [coverImage, setCoverImage] = useState(null)
    const [galleryImages, setGalleryImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [importing, setImporting] = useState(false)
    const [importMsg, setImportMsg] = useState('')
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (isEdit) {
            setLoading(true)
            api.get(`/packages/${id}`).then(res => {
                const pkg = res.data
                setForm({
                    title: pkg.title || '',
                    destination: pkg.destination || '',
                    duration: pkg.duration || '',
                    price: pkg.price || '',
                    category: pkg.category || 'Domestic',
                    overview: pkg.overview || '',
                })
                try { setHighlights(JSON.parse(pkg.highlights) || ['']) } catch { setHighlights(pkg.highlights?.split('\n') || ['']) }
                try {
                    const itin = JSON.parse(pkg.itinerary)
                    setItinerary(Array.isArray(itin) ? itin : [{ time: '', activity: '' }])
                } catch {
                    setItinerary(pkg.itinerary?.split('\n').map(l => {
                        const [time, ...rest] = l.split('|')
                        return { time: time?.trim() || '', activity: rest.join('|').trim() || '' }
                    }) || [{ time: '', activity: '' }])
                }
                try { setInclusions(JSON.parse(pkg.inclusions) || ['']) } catch { setInclusions(pkg.inclusions?.split('\n') || ['']) }
                try { setExclusions(JSON.parse(pkg.exclusions) || ['']) } catch { setExclusions(pkg.exclusions?.split('\n') || ['']) }
                try { setTerms(JSON.parse(pkg.terms) || ['']) } catch { setTerms(pkg.terms?.split('\n') || ['']) }
                setLoading(false)
            })
        }
    }, [id])

    function set(field, value) {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    // Word document import function
    async function handleDocxImport(e) {
        const file = e.target.files[0]
        if (!file) return
        if (!file.name.endsWith('.docx')) {
            alert('Please upload a .docx file')
            return
        }

        setImporting(true)
        setImportMsg('Parsing document...')

        try {
            const fd = new FormData()
            fd.append('docx', file)

            const res = await api.post('/docs/parse-docx', fd)
            const data = res.data

            setForm({
                title: data.title || '',
                destination: data.destination || '',
                duration: data.duration || '',
                price: data.price || '',
                category: data.category || 'Domestic',
                overview: data.overview || '',
            })

            if (data.highlights?.length > 0) setHighlights(data.highlights)
            if (data.itinerary?.length > 0) setItinerary(data.itinerary)
            if (data.inclusions?.length > 0) setInclusions(data.inclusions)
            if (data.exclusions?.length > 0) setExclusions(data.exclusions)
            if (data.terms?.length > 0) setTerms(data.terms)

            setImportMsg(`✅ Imported! ${data.highlights?.length || 0} highlights, ${data.itinerary?.length || 0} stops`)

        } catch (err) {
            setImportMsg('❌ Import failed. Fill manually.')
            console.error(err)
        } finally {
            setImporting(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setSaving(true)
        try {
            const fd = new FormData()
            Object.entries(form).forEach(([k, v]) => fd.append(k, v))
            fd.append('highlights', JSON.stringify(highlights.filter(h => h.trim())))
            fd.append('itinerary', JSON.stringify(itinerary.filter(i => i.activity.trim())))
            fd.append('inclusions', JSON.stringify(inclusions.filter(i => i.trim())))
            fd.append('exclusions', JSON.stringify(exclusions.filter(e => e.trim())))
            fd.append('terms', JSON.stringify(terms.filter(t => t.trim())))
            if (coverImage) fd.append('cover_image', coverImage)
            galleryImages.forEach(img => fd.append('gallery_images', img))

            if (isEdit) {
                await api.put(`/packages/${id}`, fd)
            } else {
                await api.post('/packages', fd)
            }
            navigate('/packages')
        } catch (err) {
            alert('Error saving package')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return (
        <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>Loading...</div>
    )

    return (
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
                        {isEdit ? '✏️ Edit Package' : '📦 Add New Package'}
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: 14, marginTop: 2 }}>Fill in the package details below</p>
                </div>
                <button onClick={() => navigate('/packages')} style={{
                    padding: '8px 20px', borderRadius: 10, border: '1.5px solid #e2e8f0',
                    background: 'white', fontSize: 14, fontWeight: 600, color: '#374151', cursor: 'pointer'
                }}>← Back</button>
            </div>

            {/* IMPORT FROM WORD */}
            <div style={{
                background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                borderRadius: 16, padding: 24, marginBottom: 24,
                border: '1.5px dashed #22c55e',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', flexWrap: 'wrap', gap: 16
            }}>
                <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#166534', marginBottom: 4 }}>
                        📄 Import from Word Document
                    </h3>
                    <p style={{ fontSize: 13, color: '#16a34a', margin: 0 }}>
                        Upload a .docx file to automatically fill all package details
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {importMsg && (
                        <span style={{
                            fontSize: 13, fontWeight: 600,
                            color: importing ? '#f59e0b' : importMsg.includes('❌') ? '#ef4444' : '#16a34a'
                        }}>
                            {importMsg}
                        </span>
                    )}
                    <input
                        type="file"
                        accept=".docx"
                        ref={fileInputRef}
                        onChange={handleDocxImport}
                        style={{ display: 'none' }}
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={importing}
                        style={{
                            background: importing ? '#86efac' : '#22c55e',
                            color: 'white', border: 'none',
                            padding: '10px 22px', borderRadius: 10,
                            fontWeight: 700, fontSize: 14,
                            cursor: importing ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', gap: 8,
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {importing ? '⏳ Importing...' : '📤 Upload .docx'}
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit}>

                {/* Basic Info */}
                <div style={cardStyle}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20, color: '#22c55e' }}>
                        📋 Basic Information
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {[
                            { field: 'title', label: 'PACKAGE TITLE *', placeholder: 'e.g. Ooty 1 Day Trip' },
                            { field: 'destination', label: 'DESTINATION *', placeholder: 'e.g. Ooty, Tamil Nadu' },
                            { field: 'duration', label: 'DURATION *', placeholder: 'e.g. 1 Day / 2 Days 1 Night' },
                            { field: 'price', label: 'PRICE *', placeholder: 'e.g. ₹2,999 per person' },
                        ].map(f => (
                            <div key={f.field}>
                                <label style={labelStyle}>{f.label}</label>
                                <input
                                    value={form[f.field]}
                                    onChange={e => set(f.field, e.target.value)}
                                    placeholder={f.placeholder}
                                    required={f.label.includes('*')}
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#22c55e'}
                                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                        ))}
                        <div>
                            <label style={labelStyle}>CATEGORY</label>
                            <select value={form.category} onChange={e => set('category', e.target.value)} style={inputStyle}>
                                {['Domestic', 'International', 'Pilgrimage', 'Honeymoon', 'Adventure', 'School Package', 'Corporate'].map(c => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div style={cardStyle}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20, color: '#22c55e' }}>🖼️ Images</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                            <label style={labelStyle}>COVER IMAGE</label>
                            <input type="file" accept="image/*" onChange={e => setCoverImage(e.target.files[0])}
                                style={{ ...inputStyle, padding: '8px 14px' }} />
                        </div>
                        <div>
                            <label style={labelStyle}>GALLERY IMAGES (Multiple)</label>
                            <input type="file" accept="image/*" multiple
                                onChange={e => setGalleryImages(Array.from(e.target.files))}
                                style={{ ...inputStyle, padding: '8px 14px' }} />
                        </div>
                    </div>
                </div>

                {/* Overview */}
                <div style={cardStyle}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#22c55e' }}>📝 Overview</h2>
                    <textarea
                        value={form.overview}
                        onChange={e => set('overview', e.target.value)}
                        placeholder="Write a brief overview of this package..."
                        rows={4}
                        style={{ ...inputStyle, resize: 'vertical' }}
                        onFocus={e => e.target.style.borderColor = '#22c55e'}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    />
                </div>

                {/* Highlights */}
                <div style={cardStyle}>
                    <DynamicList
                        label="HIGHLIGHTS"
                        items={highlights}
                        onChange={setHighlights}
                        placeholder="e.g. Visit Botanical Garden"
                    />
                </div>

                {/* Itinerary */}
                <div style={cardStyle}>
                    <ItineraryList items={itinerary} onChange={setItinerary} />
                </div>

                {/* Inclusions & Exclusions */}
                <div style={cardStyle}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20, color: '#22c55e' }}>
                        ✅ Inclusions & Exclusions
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        <DynamicList
                            label="INCLUSIONS"
                            items={inclusions}
                            onChange={setInclusions}
                            placeholder="e.g. AC Vehicle"
                        />
                        <DynamicList
                            label="EXCLUSIONS"
                            items={exclusions}
                            onChange={setExclusions}
                            placeholder="e.g. Entry tickets"
                        />
                    </div>
                </div>

                {/* Terms */}
                <div style={cardStyle}>
                    <DynamicList
                        label="TERMS & CONDITIONS"
                        items={terms}
                        onChange={setTerms}
                        placeholder="e.g. 50% advance required"
                    />
                </div>

                {/* Submit buttons */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingBottom: 40 }}>
                    <button type="button" onClick={() => navigate('/packages')} style={{
                        padding: '12px 28px', borderRadius: 10, border: '1.5px solid #e2e8f0',
                        background: 'white', fontSize: 15, fontWeight: 600, cursor: 'pointer'
                    }}>Cancel</button>
                    <button type="submit" disabled={saving} style={{
                        padding: '12px 36px', borderRadius: 10,
                        background: saving ? '#86efac' : '#22c55e',
                        color: 'white', border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer'
                    }}>
                        {saving ? 'Saving...' : isEdit ? '✅ Update Package' : '✅ Create Package'}
                    </button>
                </div>

            </form>
        </div>
    )
}