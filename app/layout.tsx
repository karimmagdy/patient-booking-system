import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Clinic Booking', description: 'Book your appointment' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Georgia, serif', background: '#f5f5f0', color: '#222' }}>
        {children}
      </body>
    </html>
  )
}
