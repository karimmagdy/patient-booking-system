'use client'
import { useState } from 'react'
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'
import BookingForm from './BookingForm'
import Confirmation from './Confirmation'

export type Step = 'date' | 'time' | 'form' | 'done'

export default function BookingFlow() {
  const [step, setStep] = useState<Step>('date')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [booking, setBooking] = useState<any>(null)

  function pickDate(d: string) { setSelectedDate(d); setStep('time') }
  function pickTime(t: string) { setSelectedTime(t); setStep('form') }
  function onBooked(b: any) { setBooking(b); setStep('done') }
  function reset() { setStep('date'); setSelectedDate(''); setSelectedTime(''); setBooking(null) }

  if (step === 'date') return <DatePicker onSelect={pickDate} />
  if (step === 'time') return <TimePicker date={selectedDate} onSelect={pickTime} onBack={() => setStep('date')} />
  if (step === 'form') return <BookingForm date={selectedDate} time={selectedTime} onBooked={onBooked} onBack={() => setStep('time')} />
  return <Confirmation booking={booking} onReset={reset} />
}
