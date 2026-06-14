'use client'
import { formatDate, formatTime } from '@/lib/slots'

export default function Confirmation({ booking, onReset }: { booking: any; onReset: () => void }) {
  const dateObj = new Date(booking.slot_date + 'T00:00:00')
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>✓</div>
      <h2 style={{ fontSize: 24, marginBottom: 8 }}>Booking Confirmed!</h2>
      <p style={{ fontSize: 16, color: '#555', marginBottom: 24 }}>We look forward to seeing you.</p>
      <div style={{ background: '#fff', border: '2px solid #bbb', borderRadius: 12, padding: '24px 20px', textAlign: 'left', marginBottom: 28 }}>
        <Row label="Name" value={booking.patient_name} />
        <Row label="Date" value={formatDate(dateObj)} />
        <Row label="Time" value={formatTime(booking.slot_time.slice(0, 5))} />
        <Row label="Payment" value="100 EGP — cash at the clinic" />
      </div>
      <button onClick={onReset} style={{ background: 'none', border: '2px solid #bbb', borderRadius: 8, padding: '12px 24px', fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>
        Book Another Appointment
      </button>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee', fontSize: 16, gap: 12 }}>
      <span style={{ color: '#777', flexShrink: 0 }}>{label}</span>
      <span style={{ fontWeight: 'bold', textAlign: 'right' }}>{value}</span>
    </div>
  )
}
