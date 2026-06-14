// Working hours: Sun-Thu, 4pm-9pm, 60-min slots
// Days: 0=Sun,1=Mon,2=Tue,3=Wed,4=Thu
const WORK_DAYS = [0, 1, 2, 3, 4]
const SLOT_HOURS = [16, 17, 18, 19, 20] // 4pm to 8pm start (last ends 9pm)

export function getAvailableDates(): Date[] {
  const dates: Date[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = 0; i < 30; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    if (WORK_DAYS.includes(d.getDay())) {
      dates.push(d)
    }
  }
  return dates
}

export function getSlotsForDate(): string[] {
  return SLOT_HOURS.map(h => `${String(h).padStart(2, '0')}:00`)
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatTime(t: string): string {
  const [h] = t.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const display = hour > 12 ? hour - 12 : hour
  return `${display}:00 ${ampm}`
}

export function toDateStr(d: Date): string {
  return d.toISOString().split('T')[0]
}
