export type BookingService = {
  id: string
  name: string
  description: string
  category: string
  location?: string
  imageUrl?: string
  price?: number
}

export type BookingFormData = {
  service: BookingService | null
  date: Date | null
  timeSlot: string
  customerName: string
  customerEmail: string
  customerPhone: string
  notes: string
  bookingId?: string
  referenceNumber?: string
}

export type BookingConfirmation = BookingFormData & {
  bookingId: string
  referenceNumber: string
  bookingDate: Date
}
