'use client'
import { getAvailableDates, formatDate, toDateStr } from '@/lib/slots'

export default function DatePicker({ onSelect }: { onSelect: (d: string) => void }) {
  const dates = getAvailableDates()
  return (
    <div>
      <h2 style={heading}>Step 1 of 3 — Pick a Date</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {dates.map(d => (
          <button key={toDateStr(d)} onClick={() => onSelect(toDateStr(d))} style={btn}>
            {formatDate(d)}
          </button>
        ))}
      </div>
    </div>
  )
}

const heading: React.CSSProperties = { fontSize: 18, marginBottom: 16, fontWeight: 'bold' }
const btn: React.CSSProperties = {
  padding: '16px 20px', fontSize: 17, background: '#fff', border: '2px solid #bbb',
  borderRadius: 10, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit'
}
