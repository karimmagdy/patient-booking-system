import BookingFlow from '@/components/BookingFlow'

export default function Home() {
  return (
    <main style={{ maxWidth: 540, margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h1 style={{ fontSize: 28, fontWeight: 'bold', margin: 0 }}>Book an Appointment</h1>
        <p style={{ marginTop: 10, fontSize: 17, color: '#555' }}>Sunday – Thursday &nbsp;|&nbsp; 4:00 PM – 9:00 PM</p>
        <p style={{ marginTop: 6, fontSize: 15, color: '#777' }}>Payment: 100 EGP cash at the clinic</p>
      </div>
      <BookingFlow />
    </main>
  )
}
