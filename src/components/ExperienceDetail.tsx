import React, { useMemo, useState } from 'react'
import type { BookingService } from '../types'

type Props = {
  service: BookingService
  selectedDate: Date | null
  selectedTime: string
  onSelectDate: (date: Date) => void
  onSelectTime: (time: string) => void
  onBack: () => void
  onConfirm: (quantity: number) => void
  onGoToHome: () => void
}

// Use only requested frames
const TIME_SLOTS = ['07:00 AM', '09:00 AM', '11:00 AM', '01:00 PM']
// Example sold-out slots (can be fed from API later)
const STATIC_SOLD_OUT = new Set<string>(['01:00 PM'])

export default function ExperienceDetail({ service, selectedDate, selectedTime, onSelectDate, onSelectTime, onBack, onConfirm, onGoToHome }: Props) {
  const [quantity, setQuantity] = useState(1)

  const price = service.price ?? 999
  const subtotal = price * quantity
  const fixedTaxes = 59
  const fixedTotal = 958

  const today = new Date()
  const formatDate = (date: Date | null) => (date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date')

  // Fixed date pills: Oct 22–26 of current year
  const datePills = [22, 23, 24, 25, 26].map((d) => ({ label: `Oct ${d}`, date: new Date(today.getFullYear(), 9, d) }))

  const parseSlotToDate = (slot: string, baseDate: Date | null) => {
    if (!baseDate) return null
    const [time, period] = slot.split(' ')
    const [hStr, mStr] = time.split(':')
    let hour = parseInt(hStr, 10)
    const minute = parseInt(mStr, 10)
    if (period === 'PM' && hour !== 12) hour += 12
    if (period === 'AM' && hour === 12) hour = 0
    const d = new Date(baseDate)
    d.setHours(hour, minute, 0, 0)
    return d
  }

  const isSoldOut = (slot: string) => {
    // Past slots for selected date are treated as sold out
    const slotDate = parseSlotToDate(slot, selectedDate)
    const now = new Date()
    const past = !!slotDate && slotDate.getTime() <= now.getTime()
    return STATIC_SOLD_OUT.has(slot) || past
  }

  const timeLeftLabel = (slot: string) => {
    const slotDate = parseSlotToDate(slot, selectedDate)
    if (!slotDate) return ''
    const now = new Date()
    const diffMs = slotDate.getTime() - now.getTime()
    if (diffMs <= 0) return 'Sold out'
    const diffMin = Math.floor(diffMs / 60000)
    const hours = Math.floor(diffMin / 60)
    const mins = diffMin % 60
    if (hours <= 0) return `${mins}m left`
    return `${hours}h ${mins}m left`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container-page py-8">
        <div className="mb-6">
          <button onClick={onGoToHome} className="cursor-pointer">
            <img
              src="/HDlogo.png"
              alt="HD Delite Highway Logo"
              style={{ width: 100, height: 55, transform: 'rotate(0deg)', opacity: 1, objectFit: 'contain' }}
            />
          </button>
        </div>
        <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08l-4.158 3.96H16.25A.75.75 0 0117 10z" clipRule="evenodd"/></svg>
          Details
        </button>

        {/* Constrained left column matching your layout sizes */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div style={{ width: 765 }}>
            {/* Image block */}
            <div style={{ width: 765, height: 381, borderRadius: 12, opacity: 1, overflow: 'hidden', background: '#FFFFFF', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
              {service.imageUrl && (
                <img src={service.imageUrl} alt={service.name} style={{ width: 765, height: 381, objectFit: 'cover', transform: 'rotate(0deg)', opacity: 1 }} />
              )}
            </div>

            {/* Written part */}
            <div style={{ width: 765, height: 96, gap: 16 as any, opacity: 1, display: 'flex', flexDirection: 'column', marginTop: 16 }}>
              <h1 style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: 24, color: '#161616' }}>{service.name}</h1>
              <div style={{ display: 'flex', gap: 12 }}>
                <p style={{ color: '#6C6C6C', fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>{service.description}</p>
              </div>
            </div>

            {/* Choose date, time, about container (stacked) */}
            <div style={{ width: 765, height: 278, gap: 24 as any, opacity: 1, display: 'flex', flexDirection: 'column', marginTop: 16 }}>
              {/* Choose Date */}
              <div style={{ width: 389, height: 68, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ width: 389, height: 22, color: '#161616', fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: 18, lineHeight: '22px' }}>Choose date</div>
                <div style={{ width: 389, height: 34, display: 'flex', gap: 16 }}>
                  {datePills.map(({ label, date }, idx) => {
                    const selected = selectedDate && selectedDate.toDateString() === date.toDateString()
                    const isPrimary = selected || (!selectedDate && idx === 0)
                    const baseStyle: React.CSSProperties = {
                      width: 69,
                      height: 34,
                      borderRadius: 4,
                      paddingTop: 8,
                      paddingRight: 12,
                      paddingBottom: 8,
                      paddingLeft: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      cursor: 'pointer'
                    }
                    const style = isPrimary
                      ? { ...baseStyle, background: '#FFD643', border: 'none' }
                      : { ...baseStyle, background: 'transparent', border: '0.6px solid #BDBDBD' }
                    const textStyle: React.CSSProperties = {
                      width: 45,
                      height: 18,
                      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: '18px',
                      color: isPrimary ? '#161616' : '#838383'
                    }
                    return (
                      <button key={label} style={style} onClick={() => onSelectDate(date)}>
                        <span style={textStyle}>{label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Choose Time */}
              <div style={{ width: 512, height: 96, opacity: 1, boxSizing: 'border-box' }}>
                  <div style={{ width: 512, height: 22, color: '#161616', fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: 18, lineHeight: '22px', marginBottom: 12 }}>Choose time</div>
                  <div style={{ width: 512, height: 62, display: 'flex', flexDirection: 'column', gap: 12, boxSizing: 'border-box' }}>
                    <div style={{ width: 512, height: 34, display: 'flex', gap: 16, boxSizing: 'border-box', overflow: 'hidden' }}>
                      {TIME_SLOTS.map((t, idx) => {
                        const sel = selectedTime === t
                        const sold = isSoldOut(t)
                        // example stock counts to display "left"
                        const leftMap: Record<string, number> = { '07:00 AM': 4, '09:00 AM': 2, '11:00 AM': 5 }
                        const left = leftMap[t]

                        // per-frame width spec
                        const frameWidths = [117, 110, 114, 123]
                        const frameWidth = frameWidths[idx] || 110
                        // per-time-text width spec
                        const timeTextWidths = [62, 55, 59, 53]
                        const timeTextWidth = timeTextWidths[idx] || 55

                        const baseStyle: React.CSSProperties = {
                          width: frameWidth,
                          height: 34,
                          borderRadius: 4,
                          paddingTop: 8,
                          paddingRight: 12,
                          paddingBottom: 8,
                          paddingLeft: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 6,
                          cursor: sold ? 'not-allowed' : 'pointer',
                          opacity: 1,
                          boxSizing: 'border-box'
                        }
                        const style = sold
                          ? { ...baseStyle, background: '#CCCCCC', border: 'none' }
                          : sel
                          ? { ...baseStyle, background: '#FFD643', border: 'none' }
                          : { ...baseStyle, background: 'transparent', border: '0.6px solid #BDBDBD' }

                        const timeTextStyle: React.CSSProperties = {
                          width: timeTextWidth,
                          height: 18,
                          fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                          fontWeight: 400,
                          fontSize: 14,
                          lineHeight: '18px',
                          color: sel && !sold ? '#161616' : '#838383',
                          whiteSpace: 'nowrap'
                        }
                        const leftTextStyle: React.CSSProperties = {
                          flex: '0 0 auto',
                          height: 12,
                          fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                          fontWeight: 500,
                          fontSize: 10,
                          lineHeight: '12px',
                          color: sold ? '#6A6A6A' : '#FF4C0A',
                          whiteSpace: 'nowrap',
                          paddingLeft: 2,
                          paddingRight: 2
                        }

                        return (
                          <button key={t} disabled={sold} onClick={() => !sold && onSelectTime(t)} style={{ ...style, overflow: 'hidden' }}>
                            <span style={timeTextStyle}>{t.replace(':00 ', ':00 ').toLowerCase()}</span>
                            {sold ? (
                              <span style={leftTextStyle}>Sold out</span>
                            ) : (
                              <span style={leftTextStyle}>{left ? `${left} left` : timeLeftLabel(t)}</span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                    <div style={{ width: 512, height: 16, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#838383' }}>
                      All times are in IST (GMT +5:30)
                    </div>
                  </div>
              </div>

              {/* About - exact spec */}
              <div style={{ width: 765, height: 66 }}>
                  <div style={{ width: 765, height: 22, color: '#161616', fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: 18, lineHeight: '22px', marginBottom: 12 }}>About</div>
                  <div style={{ width: 765, height: 32, borderRadius: 4, background: '#EEEEEE', paddingTop: 8, paddingRight: 12, paddingBottom: 8, paddingLeft: 12, display: 'flex', alignItems: 'center' }}>
                    <span style={{ width: 380, height: 16, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#838383' }}>
                      Scenic routes, trained guides, and safety briefing. Minimum age 10.
                    </span>
                  </div>
              </div>
            </div>
          </div>

          {/* Right: Pricing */}
          <div className="flex-1 min-w-[280px]">
            <div className="sticky top-4" style={{ width: 387, height: 303, borderRadius: 12, padding: 24, background: '#EFEFEF', boxSizing: 'border-box' }}>
              {/* Starts at */}
              <div style={{ width: 339, display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ width: 65, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '20px', color: '#656565' }}>Starts at</span>
                <span style={{ width: 44, height: 22, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 18, lineHeight: '22px', color: '#161616', textAlign: 'right' }}>₹{price}</span>
              </div>

              {/* Quantity */}
              <div style={{ width: 339, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ width: 65, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '20px', color: '#656565' }}>Quantity</span>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  {/* Minus icon button 16x16 with 0.4px border and 9.33px vector */}
                  <button
                    aria-label="decrease quantity"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ width: 16, height: 16, borderRadius: 4, border: '0.4px solid #C9C9C9', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}
                  >
                    <svg width="9.333" height="9.333" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="4.5" width="8" height="1" fill="#161616" />
                    </svg>
                  </button>
                  {/* Quantity text */}
                  <span style={{ width: 6, height: 14, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 12, lineHeight: '14px', color: '#161616', textAlign: 'center' }}>{quantity}</span>
                  {/* Plus icon button 16x16 with 0.4px border and 9.33px vector */}
                  <button
                    aria-label="increase quantity"
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ width: 16, height: 16, borderRadius: 4, border: '0.4px solid #C9C9C9', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}
                  >
                    <svg width="9.333" height="9.333" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="4.5" width="8" height="1" fill="#161616" />
                      <rect x="4.5" y="1" width="1" height="8" fill="#161616" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div style={{ width: 339, display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ width: 64, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '20px', color: '#656565' }}>Subtotal</span>
                <span style={{ width: 34, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#161616', textAlign: 'right' }}>₹{subtotal}</span>
              </div>

              {/* Taxes */}
              <div style={{ width: 339, display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ width: 45, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '20px', color: '#656565' }}>Taxes</span>
                <span style={{ width: 25, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: '#161616', textAlign: 'right' }}>₹{fixedTaxes}</span>
              </div>

              {/* Divider */}
              <div style={{ width: 339, height: 1, background: '#D9D9D9', marginBottom: 12 }} />

              {/* Total */}
              <div style={{ width: 339, height: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <span style={{ width: 48, height: 24, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: 20, lineHeight: '24px', color: '#161616' }}>Total</span>
                <span style={{ width: 49, height: 24, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: 20, lineHeight: '24px', color: '#161616', textAlign: 'right' }}>₹{fixedTotal}</span>
              </div>

              {/* Confirm button */}
              <button
                onClick={() => onConfirm(quantity)}
                style={{ width: 339, height: 44, borderRadius: 8, paddingTop: 12, paddingRight: 20, paddingBottom: 12, paddingLeft: 20, background: selectedTime ? '#FFD643' : '#CCCCCC', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, border: 'none', cursor: 'pointer' }}
              >
                <span style={{ width: 62, height: 20, fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontWeight: 500, fontSize: 16, lineHeight: '20px', color: '#161616' }}>Confirm</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


