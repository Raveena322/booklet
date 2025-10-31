import React from 'react'

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM',
  '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM', '08:00 PM'
]

type Props = {
  selectedTime: string
  onSelectTime: (time: string) => void
  onBack: () => void
  onNext: () => void
  serviceName: string
  selectedDate: Date | null
  onGoToHome: () => void
}

export default function TimePicker({ selectedTime, onSelectTime, onBack, onNext, serviceName, selectedDate, onGoToHome }: Props) {
  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
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
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">Select Time</h2>
            <p className="text-neutral-600">
              Choose your preferred time slot for {serviceName} on {formatDate(selectedDate)}
            </p>
          </div>

          {/* Time slots */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-3 gap-3">
              {TIME_SLOTS.map((time) => {
                const isSelected = selectedTime === time
                return (
                  <button
                    key={time}
                    onClick={() => onSelectTime(time)}
                    className={`
                      px-4 py-3 rounded-lg font-medium transition-all
                      ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-neutral-50 text-neutral-700 hover:bg-indigo-50 hover:text-indigo-700 border border-neutral-200'
                      }
                    `}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Next button */}
          {selectedTime && (
            <button
              onClick={onNext}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Continue to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  )
}




