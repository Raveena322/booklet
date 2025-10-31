import React from 'react'
import type { BookingConfirmation } from '../types'

type Props = {
  booking: BookingConfirmation
  onBackToHome: () => void
  onViewBooking: () => void
  onGoToHome?: () => void
}

export default function ConfirmationScreen({ booking, onBackToHome, onViewBooking, onGoToHome }: Props) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="mb-6 text-center">
          {onGoToHome && (
            <button onClick={onGoToHome} className="cursor-pointer inline-block">
              <img src="/HDlogo.png" alt="HD Delite Highway Logo" style={{ width: 100, height: 55, objectFit: 'contain' }} />
            </button>
          )}
        </div>
        {/* Success animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative bg-white rounded-full p-6 shadow-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-16 h-16 text-green-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-3">Booking Confirmed!</h1>
          <p className="text-neutral-600 mb-8">
            Your booking has been successfully confirmed. You will receive a confirmation email shortly.
          </p>

          {/* Booking details */}
          <div className="bg-indigo-50 rounded-xl p-6 mb-6">
            <div className="text-left space-y-4">
              <div className="flex items-start justify-between">
                <span className="text-sm text-neutral-600">Reference Number</span>
                <span className="font-bold text-indigo-600">{booking.referenceNumber}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm text-neutral-600">Service</span>
                <span className="font-semibold text-neutral-900">{booking.service?.name}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm text-neutral-600">Date</span>
                <span className="font-semibold text-neutral-900">
                  {booking.date ? formatDate(booking.date) : 'N/A'}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm text-neutral-600">Time</span>
                <span className="font-semibold text-neutral-900">{booking.timeSlot}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm text-neutral-600">Booked On</span>
                <span className="font-semibold text-neutral-900">{formatDate(booking.bookingDate)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={onBackToHome}
              className="px-6 py-3 border-2 border-neutral-200 hover:border-neutral-300 text-neutral-700 font-semibold rounded-xl transition-colors"
            >
              Back to Home
            </button>
            <button
              onClick={onViewBooking}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              View Booking
            </button>
          </div>
        </div>

        {/* Additional info */}
        <div className="text-center text-sm text-neutral-500">
          <p>Need help? Contact us at support@hdbooking.com</p>
        </div>
      </div>
    </div>
  )
}




