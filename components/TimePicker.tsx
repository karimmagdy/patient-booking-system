'use client'
import { useEffect, useState } from 'react'
import { getSlotsForDate, formatTime, formatDate } from '@/lib/slots'
import { getBookedSlots } from '@/app/actions'

export default function TimePicker({ date, onSelect, onBack }: { date: string; onSelect: (t: string) => void; onBack: () => void }) {
  const allSlots = getSlotsForDate()
  const [booked, setBooked] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBookedSlots(date).then(b => { setBooked(b); setLoading(false) })
  }, [date])

  const dateObj = new Date(date + 'T00:00:00')

  return (
    <div>
      <h2 style={heading}>Step 2 of 3 — Pick a Time</h2>
      <p style={{ marginBottom: 16, color: '#555', fontSize: 15 }}>{formatDate(dateObj)}</p>
      {loading ? <p>Loading...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {allSlots.map(slot => {
            const taken = booked.includes(slot)
            return (
              <button key={slot} disabled={taken} onClick={() => onSelect(slot)}
                style={{ ...btn, background: taken ? '#eee' : '#fff', color: taken ? '#aaa' : '#222', cursor: taken ? 'not-allowed' : 'pointer', borderColor: taken ? '#ddd' : '#bbb' }}>
                {formatTime(slot)}{taken ? '  — Booked' : ''}
              </button>
            )
          })}
        </div>
      )}
      <button onClick={onBack} style={backBtn}>← Back</button>
    </div>
  )
}

const heading: React.CSSProperties = { fontSize: 18, marginBottom: 8, fontWeight: 'bold' }
const btn: React.CSSProperties = { padding: '16px 20px', fontSize: 17, border: '2px solid #bbb', borderRadius: 10, textAlign: 'left', fontFamily: 'inherit' }
const backBtn: React.CSSProperties = { marginTop: 20, background: 'none', border: 'none', color: '#555', fontSize: 15, cursor: 'pointer', padding: 0 }
