'use server'
import { supabaseAdmin } from '@/lib/supabase'

export async function createBooking(formData: FormData) {
  const name = (formData.get('name') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim()
  const date = formData.get('date') as string
  const time = formData.get('time') as string

  if (!name || !phone || !date || !time) {
    return { error: 'Please fill in all fields.' }
  }

  const { data, error } = await supabaseAdmin
    .schema('user_312a098d')
    .from('bookings')
    .insert({ patient_name: name, phone, slot_date: date, slot_time: time })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return { error: 'Sorry, that slot was just taken. Please pick another time.' }
    }
    return { error: 'Something went wrong. Please try again.' }
  }

  return { booking: data }
}

export async function getBookings() {
  const { data, error } = await supabaseAdmin
    .schema('user_312a098d')
    .from('bookings')
    .select('*')
    .order('slot_date', { ascending: true })
    .order('slot_time', { ascending: true })

  if (error) return []
  return data
}

export async function getBookedSlots(date: string): Promise<string[]> {
  const { data } = await supabaseAdmin
    .schema('user_312a098d')
    .from('bookings')
    .select('slot_time')
    .eq('slot_date', date)
  return (data ?? []).map((r: { slot_time: string }) => r.slot_time.slice(0, 5))
}
