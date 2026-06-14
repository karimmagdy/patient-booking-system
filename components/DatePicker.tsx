'use client'
import { getAvailableDates, formatDate, toDateStr } from '@/lib/slots'

const SLOT_TIMES = ['4:00 PM - 5:00 PM', '5:00 PM - 6:00 PM', '6:00 PM - 7:00 PM', '7:00 PM - 8:00 PM', '8:00 PM - 9:00 PM']

export default function DatePicker({ onSelect }: { onSelect: (d: string) => void }) {
  const dates = getAvailableDates()

  if (dates.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0', color: '#777', fontSize: 17 }}>
        No available appointments at this time. Please call the clinic to book.
      </div>
    )
  }

  return (
    <div>
      <h2 style={heading}>Pick a Date &amp; Time</h2>
      <p style={{ color: '#777', fontSize: 14, marginBottom: 16 }}>Available times: {SLOT_TIMES[0]} through {SLOT_TIMES[SLOT_TIMES.length - 1]}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {dates.map(d => (
          <button key={toDateStr(d)} onClick={() => onSelect(toDateStr(d))} style={btn}>
            <div style={{ fontWeight: 'bold', fontSize: 17 }}>{formatDate(d)}</div>
            <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>5 slots: 4:00 PM &ndash; 9:00 PM (60 min each)</div>
          </button>
        ))}
      </div>
    </div>
  )
}

const heading: React.CSSProperties = { fontSize: 18, marginBottom: 8, fontWeight: 'bold' }
const btn: React.CSSProperties = {
  padding: '16px 20px', fontSize: 16, background: '#fff', border: '2px solid #bbb',
  borderRadius: 10, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit'
}
