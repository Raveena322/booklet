import React, { useState } from 'react'
import type { BookingFormData } from '../types'
import { createBooking, validatePromo, type BookingResponse } from '../api/client'

type Props = {
  bookingData: BookingFormData
  onBack: () => void
  onConfirm: (data: BookingFormData) => void
  onGoToHome: () => void
}

export default function CheckoutScreen({ bookingData, onBack, onConfirm, onGoToHome }: Props) {
  const [formData, setFormData] = useState({
    customerName: bookingData.customerName || 'John Doe',
    customerEmail: bookingData.customerEmail || 'test@test.com',
    customerPhone: bookingData.customerPhone,
    notes: bookingData.notes,
  })
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [promoCode, setPromoCode] = useState('')
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [promoError, setPromoError] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return
    
    try {
      setPromoError('')
      const result = await validatePromo({ 
        code: promoCode,
        amount: bookingData.service?.price ? bookingData.service.price : 999
      })
      
      if (result.valid && result.discount) {
        setPromoDiscount(result.discount)
        setPromoError('')
      } else {
        setPromoDiscount(0)
        setPromoError(result.error || 'Invalid promo code')
      }
    } catch (error) {
      setPromoError('Failed to validate promo code')
      setPromoDiscount(0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingData.service || !bookingData.date || !bookingData.timeSlot) {
      setSubmitError('Please select date and time')
      return
    }

    try {
      setLoading(true)
      setSubmitError('')
      
      const bookingRequest = {
        experienceId: bookingData.service.id,
        date: bookingData.date.toISOString(),
        timeSlot: bookingData.timeSlot,
        quantity: 1,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone || '',
        promoCode: promoCode || undefined,
        notes: formData.notes || ''
      }

      const response: BookingResponse = await createBooking(bookingRequest)
      
      // Update bookingData with the response from API
      const updatedData: BookingFormData = {
        ...bookingData,
        ...formData,
        bookingId: response.bookingId,
        referenceNumber: response.referenceNumber,
      }
      
      // Pass the response to App.tsx through onConfirm
      onConfirm(updatedData)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to create booking')
      console.error('Booking error:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDateShort = (date: Date | null) => {
    if (!date) return '2025-10-22'
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="container-page py-8" style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          {/* Left: Checkout form */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="mb-6">
                <button onClick={onGoToHome} className="cursor-pointer">
                  <img
                    src="/HDlogo.png"
                    alt="HD Delite Highway Logo"
                    style={{ width: 100, height: 55, transform: 'rotate(0deg)', opacity: 1, objectFit: 'contain' }}
                  />
                </button>
              </div>
              <button
                onClick={onBack}
                className="mb-6 inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08l-4.158 3.96H16.25A.75.75 0 0117 10z"
                    clipRule="evenodd"
                  />
                </svg>
                Check out
              </button>
            </div>

            {/* Checkout frame to exact spec */}
            <form onSubmit={handleSubmit} style={{ width: 739, height: 198, borderRadius: 12, paddingTop: 20, paddingRight: 24, paddingBottom: 20, paddingLeft: 24, background: '#EFEFEF' }}>
              {/* Frame 60: two columns Full name / Email */}
              <div style={{ width: 691, height: 68, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* Full name group */}
                <div style={{ width: 333.5, height: 68, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label htmlFor="name" style={{ width: 333.5, height: 18, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '18px', color: '#5B5B5B' }}>Full name</label>
                  <input
                    id="name"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Your name"
                    style={{ width: 333.5, height: 42, borderRadius: 6, paddingTop: 12, paddingRight: 16, paddingBottom: 12, paddingLeft: 16, background: '#DDDDDD', border: 'none', color: '#727272', fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontSize: 14 }}
                  />
                </div>
                {/* Email group */}
                <div style={{ width: 333.5, height: 68, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label htmlFor="email" style={{ width: 333.5, height: 18, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '18px', color: '#5B5B5B' }}>Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    placeholder="Your email"
                    style={{ width: 333.5, height: 42, borderRadius: 6, paddingTop: 12, paddingRight: 16, paddingBottom: 12, paddingLeft: 16, background: '#DDDDDD', border: 'none', color: '#727272', fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontSize: 14 }}
                  />
                </div>
              </div>

            {/* Frame 59: Promo code and Apply */}
            <div style={{ width: 691, display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  style={{ width: 604, height: 42, borderRadius: 6, paddingTop: 12, paddingRight: 16, paddingBottom: 12, paddingLeft: 16, background: '#DDDDDD', border: 'none', color: '#727272', fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontSize: 14 }}
                />
                <button 
                  type="button" 
                  onClick={handleApplyPromo}
                  style={{ width: 71, height: 42, borderRadius: 8, paddingTop: 12, paddingRight: 16, paddingBottom: 12, paddingLeft: 16, background: '#161616', color: '#F9F9F9', fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: 14, lineHeight: '18px', cursor: 'pointer', border: 'none' }}
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p style={{ color: '#FF4C0A', fontSize: 12, margin: 0 }}>{promoError}</p>
              )}
              {promoDiscount > 0 && (
                <p style={{ color: '#22c55e', fontSize: 12, margin: 0 }}>Discount applied: ₹{promoDiscount}</p>
              )}
            </div>

              {/* Frame 61: Checkbox and text */}
              <div style={{ width: 236, height: 16, display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, cursor: 'pointer' }} onClick={() => setAgreeTerms(!agreeTerms)}>
                <span style={{ width: 16, height: 16, border: '1px solid #5B5B5B', borderRadius: 2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  {agreeTerms && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="#5B5B5B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <span style={{ width: 212, height: 16, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#5B5B5B' }}>
                  I agree to the terms and safety policy
                </span>
              </div>
            </form>
          </div>

          {/* Right: Summary frame */}
          <div style={{ width: 387, height: 349, borderRadius: 12, padding: 24, background: '#EFEFEF' }}>
            <div style={{ width: 339, height: 233, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Frame 52: Booking details */}
              <div style={{ width: 339, height: 110, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* Experience */}
                <div style={{ width: 339, height: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ width: 84, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '20px', color: '#656565' }}>Experience</span>
                  <span style={{ width: 69, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '20px', color: '#161616', textAlign: 'right' }}>{bookingData.service?.name || 'Kayaking'}</span>
                </div>
                {/* Date */}
                <div style={{ width: 339, height: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ width: 36, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '20px', color: '#656565' }}>Date</span>
                  <span style={{ width: 79, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#161616', textAlign: 'right' }}>{formatDateShort(bookingData.date)}</span>
                </div>
                {/* Time */}
                <div style={{ width: 339, height: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ width: 38, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '20px', color: '#656565' }}>Time</span>
                  <span style={{ width: 63, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#161616', textAlign: 'right' }}>{bookingData.timeSlot || '09:00 am'}</span>
                </div>
                {/* Qty */}
                <div style={{ width: 339, height: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ width: 27, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '20px', color: '#656565' }}>Qty</span>
                  <span style={{ width: 7, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#161616', textAlign: 'right' }}>1</span>
                </div>
              </div>

              {/* Frame 53: Pricing */}
              <div style={{ width: 339, height: 50, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* Subtotal */}
                <div style={{ width: 339, height: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ width: 64, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '20px', color: '#656565' }}>Subtotal</span>
                  <span style={{ width: 39, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '20px', color: '#161616', textAlign: 'right' }}>₹999</span>
                </div>
                {/* Taxes */}
                <div style={{ width: 339, height: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ width: 45, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '20px', color: '#656565' }}>Taxes</span>
                  <span style={{ width: 25, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#161616', textAlign: 'right' }}>₹59</span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ width: 339, height: 1, background: '#D9D9D9' }} />

              {/* Total */}
              <div style={{ width: 339, height: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ width: 48, height: 24, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: 20, lineHeight: '24px', color: '#161616' }}>Total</span>
                <span style={{ width: 49, height: 24, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: 20, lineHeight: '24px', color: '#161616', textAlign: 'right' }}>₹958</span>
              </div>

              {/* Pay and Confirm button */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {submitError && (
                  <p style={{ color: '#FF4C0A', fontSize: 12, margin: 0, textAlign: 'center' }}>{submitError}</p>
                )}
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                  disabled={loading || !agreeTerms}
                  style={{ 
                    width: 339, 
                    height: 44, 
                    borderRadius: 8, 
                    paddingTop: 12, 
                    paddingRight: 20, 
                    paddingBottom: 12, 
                    paddingLeft: 20, 
                    background: (loading || !agreeTerms) ? '#CCCCCC' : '#FFD643', 
                    border: 'none', 
                    cursor: (loading || !agreeTerms) ? 'not-allowed' : 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    opacity: (loading || !agreeTerms) ? 0.6 : 1
                  }}
                >
                  <span style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: 16, lineHeight: '20px', color: '#161616' }}>
                    {loading ? 'Processing...' : 'Pay and Confirm'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer frame */}
      <div style={{ width: '100%', height: 87, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, paddingRight: 124, paddingBottom: 16, paddingLeft: 124, background: '#F9F9F9', boxShadow: '0px 2px 16px 0px rgba(0, 0, 0, 0.1)' }}>
        {/* Footer content can go here */}
      </div>
    </div>
  )
}

