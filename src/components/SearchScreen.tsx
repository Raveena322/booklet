import React, { useState, useMemo } from 'react'
import type { BookingService } from '../types'
import { searchServices } from '../data/services'

type Props = {
  onSelectService: (service: BookingService) => void
  onBack: () => void
  onGoToHome: () => void
}

export default function SearchScreen({ onSelectService, onBack, onGoToHome }: Props) {
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchServices(query), [query])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container-page py-8">
        <div className="max-w-4xl mx-auto">
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
              Back
            </button>
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">Search & Select</h2>
            <p className="text-neutral-600">Find the perfect service, room, or location</p>
          </div>

          {/* Search bar */}
          <div className="mb-8">
            <form
              className="relative"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search services, rooms, or locations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              />
            </form>
          </div>

          {/* Results */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((service) => (
                <button
                  key={service.id}
                  onClick={() => onSelectService(service)}
                  className="bg-white border border-neutral-200 rounded-xl p-6 hover:border-indigo-500 hover:shadow-lg transition-all text-left group"
                >
                  {service.imageUrl && (
                    <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                          {service.category}
                        </span>
                        {service.location && (
                          <span className="text-xs text-neutral-500">{service.location}</span>
                        )}
                      </div>
                      <h3 className="font-semibold text-neutral-900 mb-1">{service.name}</h3>
                      <p className="text-sm text-neutral-600">{service.description}</p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 text-neutral-400 group-hover:text-indigo-600 flex-shrink-0 mt-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-16 h-16 text-neutral-300 mx-auto mb-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-neutral-500 text-lg">No results found</p>
              <p className="text-neutral-400 text-sm mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}




