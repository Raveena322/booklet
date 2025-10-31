import React, { useState } from 'react'

type Props = {
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
  onBack: () => void
  onNext: () => void
  serviceName: string
  onGoToHome: () => void
}

export default function DatePicker({ selectedDate, onSelectDate, onBack, onNext, serviceName, onGoToHome }: Props) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  // Get first day of month
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const isPast = (day: number) => {
    const date = new Date(year, month, day)
    return date < today
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    )
  }

  const handleSelectDate = (day: number) => {
    if (isPast(day)) return
    onSelectDate(new Date(year, month, day))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  const prevMonth = () => {
    if (year === today.getFullYear() && month === today.getMonth()) return
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container-page py-8">
        <div className="mb-6">
          <button onClick={onGoToHome} className="cursor-pointer">
            <img src="/HDlogo.png" alt="HD Delite Highway Logo" style={{ width: 100, height: 55, objectFit: 'contain' }} />
          </button>
        </div>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
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
              Back
            </button>
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">Select Date</h2>
            <p className="text-neutral-600">Choose your preferred date for {serviceName}</p>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                disabled={year === today.getFullYear() && month === today.getMonth()}
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
              </button>
              <h3 className="text-xl font-semibold text-neutral-900">
                {monthNames[month]} {year}
              </h3>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Days header */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-semibold text-neutral-500 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {emptyDays.map((day) => (
                <div key={`empty-${day}`} />
              ))}
              {days.map((day) => {
                const isPastDay = isPast(day)
                const isSelectedDay = isSelected(day)
                return (
                  <button
                    key={day}
                    onClick={() => handleSelectDate(day)}
                    disabled={isPastDay}
                    className={`
                      aspect-square rounded-lg text-sm font-medium transition-colors
                      ${
                        isPastDay
                          ? 'text-neutral-300 cursor-not-allowed'
                          : isSelectedDay
                          ? 'bg-indigo-600 text-white'
                          : 'text-neutral-700 hover:bg-indigo-50'
                      }
                    `}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Next button */}
          {selectedDate && (
            <button
              onClick={onNext}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Continue to Time Selection
            </button>
          )}
        </div>
      </div>
    </div>
  )
}




