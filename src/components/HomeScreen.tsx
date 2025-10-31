import React, { useState, useEffect } from 'react'
import type { BookingService } from '../types'
import { fetchExperiences, type Experience } from '../api/client'

type Props = {
  onStartBooking: () => void
  onViewDetails: (service: BookingService) => void
  onGoToHome: () => void
}

export default function HomeScreen({ onStartBooking, onViewDetails, onGoToHome }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeQuery, setActiveQuery] = useState('')
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setLoading(true)
        const data = await fetchExperiences()
        setExperiences(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load experiences')
        console.error('Error loading experiences:', err)
      } finally {
        setLoading(false)
      }
    }
    loadExperiences()
  }, [])

  const normalizedQuery = activeQuery.trim().toLowerCase()
  const filteredOptions = normalizedQuery
    ? experiences.filter((o) =>
        [o.name, o.location]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(normalizedQuery))
      )
    : experiences

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header with Logo and Search */}
      <header className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 border-b border-neutral-100">
        <div className="container-page py-4 flex items-center justify-between gap-4">
          {/* HD Delite Highway Logo (image only) */}
          <div className="flex items-center">
            <button onClick={onGoToHome} className="cursor-pointer">
              <img
                src="/HDlogo.png"
                alt="HD Delite Highway Logo"
                style={{ width: 100, height: 55, transform: 'rotate(0deg)', opacity: 1, objectFit: 'contain' }}
              />
            </button>
          </div>

          {/* Search Bar with exact layout specs */}
          <div className="flex items-center" style={{ gap: 10 }}>
            <input
              type="text"
              placeholder="Search experiences"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  setActiveQuery(searchQuery)
                }
              }}
              className="focus:outline-none"
              style={{
                width: 340,
                height: 42,
                borderRadius: 4,
                paddingTop: 12,
                paddingRight: 16,
                paddingBottom: 12,
                paddingLeft: 16,
                background: '#EDEDED',
                transform: 'rotate(0deg)',
                opacity: 1,
              }}
            />
            <button
              onClick={() => setActiveQuery(searchQuery)}
              className="font-semibold text-black transition-all hover:shadow-lg"
              style={{
                width: 87,
                height: 42,
                borderRadius: 8,
                paddingTop: 12,
                paddingRight: 20,
                paddingBottom: 12,
                paddingLeft: 20,
                background: '#FFD643',
                transform: 'rotate(0deg)',
                opacity: 1,
              }}
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Main Content with 8 Booking Options */}
      <main className="container-page py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">Choose Your Experience</h2>
          <p className="text-neutral-600">Select from our amazing booking options</p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-neutral-600">Loading experiences...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* 8 Experience Cards Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredOptions.map((option) => (
              <div
                key={option._id}
              style={{
                width: 280,
                height: 312,
                transform: 'rotate(0deg)',
                opacity: 1,
                overflow: 'hidden',
                boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                background: '#FFFFFF',
                borderRadius: 12,
                cursor: 'pointer',
              }}
              onClick={onStartBooking}
            >
              {/* Frame 9 - Image container */}
              <div style={{ width: 280, height: 170, position: 'relative' }}>
                <img
                  src={option.imageUrl}
                  alt={option.name}
                  style={{ width: 280, height: 170, objectFit: 'cover', transform: 'rotate(0deg)', opacity: 1 }}
                />
              </div>

              {/* Frame 14 - Info panel container */}
              <div
                style={{
                  width: 280,
                  height: 142,
                  background: '#F0F0F0',
                  paddingTop: 12,
                  paddingRight: 16,
                  paddingBottom: 12,
                  paddingLeft: 16,
                  transform: 'rotate(0deg)',
                  opacity: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                {/* Frame 15 - Content container */}
                <div
                  style={{
                    width: 248,
                    height: 68,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    transform: 'rotate(0deg)',
                    opacity: 1,
                  }}
                >
                  {/* Frame 11 - Title and location pill row */}
                  <div
                    style={{
                      width: 248,
                      height: 24,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transform: 'rotate(0deg)',
                      opacity: 1,
                    }}
                  >
                    {/* Title */}
                    <span
                      style={{
                        width: 190,
                        height: 'auto',
                        fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        fontSize: 16,
                        lineHeight: '20px',
                        color: '#161616',
                        transform: 'rotate(0deg)',
                        opacity: 1,
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                      }}
                    >
                      {option.name}
                    </span>

                    {/* Frame 10 - Location pill */}
                    <div
                      style={{
                        minWidth: 48,
                        height: 24,
                        borderRadius: 4,
                        paddingTop: 4,
                        paddingRight: 8,
                        paddingBottom: 4,
                        paddingLeft: 8,
                        background: '#D6D6D6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'rotate(0deg)',
                        opacity: 1,
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          width: 'auto',
                          height: 16,
                          fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                          fontWeight: 500,
                          fontSize: 11,
                          lineHeight: '16px',
                          color: '#161616',
                          transform: 'rotate(0deg)',
                          opacity: 1,
                        }}
                      >
                        {option.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      width: 248,
                      height: 32,
                      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: '16px',
                      color: '#6C6C6C',
                      margin: 0,
                      transform: 'rotate(0deg)',
                      opacity: 1,
                    }}
                  >
                    Curated small-group experience. Certified guide. Safety first with gear included.
                  </p>
                </div>

                {/* Frame 13 - Price and CTA row */}
                <div
                  style={{
                    width: 248,
                    height: 30,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transform: 'rotate(0deg)',
                    opacity: 1,
                  }}
                >
                  {/* Frame 12 - Price group */}
                  <div
                    style={{
                      width: 85,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      transform: 'rotate(0deg)',
                      opacity: 1,
                    }}
                  >
                    <span
                      style={{
                        width: 29,
                        height: 16,
                        fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: '#161616',
                        transform: 'rotate(0deg)',
                        opacity: 1,
                      }}
                    >
                      From
                    </span>
                    <span
                      style={{
                        width: 50,
                        height: 24,
                        fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                        fontWeight: 500,
                        fontSize: 20,
                        lineHeight: '24px',
                        color: '#161616',
                        transform: 'rotate(0deg)',
                        opacity: 1,
                      }}
                    >
                      ₹{option.price ?? 999}
                    </span>
                  </div>

                  {/* Frame 10 - View Details button */}
                  <button
                    style={{
                      width: 99,
                      height: 30,
                      borderRadius: 4,
                      paddingTop: 6,
                      paddingRight: 8,
                      paddingBottom: 6,
                      paddingLeft: 8,
                      background: '#FFD643',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      transform: 'rotate(0deg)',
                      opacity: 1,
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  onClick={(e) => {
                    e.stopPropagation()
                    const service: BookingService = {
                      id: option._id,
                      name: option.name,
                      description: option.description,
                      category: option.category,
                      location: option.location,
                      imageUrl: option.imageUrl,
                      price: option.price,
                    }
                    onViewDetails(service)
                  }}
                  >
                    <span
                      style={{
                        width: 83,
                        height: 18,
                        fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                        fontWeight: 500,
                        fontSize: 14,
                        lineHeight: '18px',
                        color: '#161616',
                        transform: 'rotate(0deg)',
                        opacity: 1,
                      }}
                    >
                      View Details
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="container-page py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} HD Delite Highway. All rights reserved.
      </footer>
    </div>
  )
}

