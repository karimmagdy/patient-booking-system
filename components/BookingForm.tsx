'use client'
import { useState } from 'react'
import { createBooking } from '@/app/actions'
import { formatDate, formatTime } from '@/lib/slots'

export default function BookingForm({ date, time, onBooked, onBack }: { date: string; time: string; onBooked: (b: any) => void; onBack: () => void }) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dateObj = new Date(date + 'T00:00:00')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    fd.set('date', date)
    fd.set('time', time)
    const result = await createBooking(fd)
    setLoading(false)
    if (result.error) { setError(result.error); return }
    onBooked(result.booking)
  }

  return (
    <div>
      <h2 style={heading}>Step 3 of 3 — Your Details</h2>
      <p style={{ marginBottom: 20, color: '#555', fontSize: 15 }}>
        {formatDate(dateObj)} at {formatTime(time)}
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <label style={label}>
          Full Name
          <input name="name" required style={input} placeholder="e.g. Ahmed Hassan" />
        </label>
        <label style={label}>
          Phone Number
          <input name="phone" required style={input} placeholder="e.g. 010 0000 0000" type="tel" />
        </label>
        {error && <p style={{ color: '#c00', fontSize: 15 }}>{error}</p>}
        <button type="submit" disabled={loading} style={submitBtn}>
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
      <button onClick={onBack} style={backBtn}>← Back</button>
    </div>
  )
}

const heading: React.CSSProperties = { fontSize: 18, marginBottom: 8, fontWeight: 'bold' }
const label: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 6, fontSize: 16 }
const input: React.CSSProperties = { padding: '14px 12px', fontSize: 17, border: '2px solid #bbb', borderRadius: 8, fontFamily: 'inherit' }
const submitBtn: React.CSSProperties = { padding: '16px', fontSize: 18, background: '#2a6496', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 'bold' }
const backBtn: React.CSSProperties = { marginTop: 16, background: 'none', border: 'none', color: '#555', fontSize: 15, cursor: 'pointer', padding: 0 }
