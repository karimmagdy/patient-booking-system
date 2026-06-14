import { getBookings } from '@/app/actions'
import { formatDate, formatTime } from '@/lib/slots'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const bookings = await getBookings()

  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: 26, marginBottom: 6 }}>All Appointments</h1>
      <p style={{ color: '#777', marginBottom: 28, fontSize: 15 }}>{bookings.length} booking{bookings.length !== 1 ? 's' : ''} total</p>
      {bookings.length === 0 ? (
        <p style={{ color: '#999', fontSize: 16 }}>No bookings yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {bookings.map((b: any) => (
            <div key={b.id} style={{ background: '#fff', border: '2px solid #ddd', borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ fontWeight: 'bold', fontSize: 17 }}>{b.patient_name}</div>
              <div style={{ color: '#555', fontSize: 15, marginTop: 4 }}>
                {formatDate(new Date(b.slot_date + 'T00:00:00'))} at {formatTime(b.slot_time.slice(0, 5))}
              </div>
              <div style={{ color: '#777', fontSize: 14, marginTop: 4 }}>{b.phone}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
