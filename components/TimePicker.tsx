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
  const available = allSlots.filter(s => !booked.includes(s))

  return (
    <div>
      <h2 style={heading}>Pick a Time</h2>
      <p style={{ marginBottom: 16, color: '#555', fontSize: 15 }}>{formatDate(dateObj)}</p>
      {loading ? <p>Loading...</p> : available.length === 0 ? (
        <div style={{ padding: '20px 0', color: '#c00', fontSize: 16 }}>
          No available slots on this day. Please go back and choose another date.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {allSlots.map(slot => {
            const taken = booked.includes(slot)
            const [h] = slot.split(':')
            const endHour = parseInt(h) + 1
            const endTime = `${endHour > 12 ? endHour - 12 : endHour}:00 ${endHour >= 12 ? 'PM' : 'AM'}`
            return (
              <button key={slot} disabled={taken} onClick={() => onSelect(slot)}
                style={{ ...btn, background: taken ? '#eee' : '#fff', color: taken ? '#aaa' : '#222', cursor: taken ? 'not-allowed' : 'pointer', borderColor: taken ? '#ddd' : '#bbb' }}>
                <span style={{ fontWeight: 'bold' }}>{formatTime(slot)} &ndash; {endTime}</span>
                {taken ? <span style={{ fontSize: 13, marginLeft: 8 }}>Booked</span> : ''}
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
const btn: React.CSSProperties = { padding: '16px 20px', fontSize: 17, border: '2px solid #bbb', borderRadius: 10, textAlign: 'left', fontFamily: 'inherit', width: '100%' }
const backBtn: React.CSSProperties = { marginTop: 20, background: 'none', border: 'none', color: '#555', fontSize: 15, cursor: 'pointer', padding: 0 }
