import React, { useState } from 'react'
import type { BookingService, BookingFormData, BookingConfirmation } from './types'
import HomeScreen from './components/HomeScreen'
import SearchScreen from './components/SearchScreen'
import DatePicker from './components/DatePicker'
import TimePicker from './components/TimePicker'
import CheckoutScreen from './components/CheckoutScreen'
import ConfirmationScreen from './components/ConfirmationScreen'
import ExperienceDetail from './components/ExperienceDetail'

type Screen = 'home' | 'search' | 'detail' | 'date' | 'time' | 'checkout' | 'confirmation'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [bookingData, setBookingData] = useState<BookingFormData>({
    service: null,
    date: null,
    timeSlot: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: '',
  })
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null)

  const handleStartBooking = () => setCurrentScreen('search')

  const handleViewDetails = (service: BookingService) => {
    setBookingData({ ...bookingData, service })
    setCurrentScreen('detail')
  }

  const handleSelectService = (service: BookingService) => {
    setBookingData({ ...bookingData, service })
    setCurrentScreen('date')
  }

  const handleSelectDate = (date: Date) => {
    setBookingData({ ...bookingData, date })
  }

  const handleSelectTime = (timeSlot: string) => {
    setBookingData({ ...bookingData, timeSlot })
  }

  const handleConfirmBooking = (data: BookingFormData) => {
    // Use booking response from API if available, otherwise generate fallback
    const bookingId = data.bookingId || `BK${Date.now()}`
    const referenceNumber = data.referenceNumber || 'HUF56&SO'
    
    const confirmationData: BookingConfirmation = {
      ...data,
      bookingId,
      referenceNumber,
      bookingDate: new Date(),
    }
    
    setConfirmation(confirmationData)
    setCurrentScreen('confirmation')
  }

  const handleBackToHome = () => {
    setCurrentScreen('home')
    setBookingData({
      service: null,
      date: null,
      timeSlot: '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      notes: '',
    })
    setConfirmation(null)
  }

  const handleViewBooking = () => {
    // In a real app, this would navigate to a booking details page
    alert(`Booking ID: ${confirmation?.bookingId}\nReference: ${confirmation?.referenceNumber}`)
  }

  const goToScreen = (screen: Screen) => setCurrentScreen(screen)

  return (
    <div>
      {currentScreen === 'home' && <HomeScreen onStartBooking={handleStartBooking} onViewDetails={handleViewDetails} onGoToHome={handleBackToHome} />}
      
      {currentScreen === 'detail' && bookingData.service && (
        <ExperienceDetail
          service={bookingData.service}
          selectedDate={bookingData.date}
          selectedTime={bookingData.timeSlot}
          onSelectDate={handleSelectDate}
          onSelectTime={handleSelectTime}
          onBack={() => setCurrentScreen('home')}
          onConfirm={(quantity) => {
            // Quantity can be forwarded to checkout in a real app; for now proceed
            setCurrentScreen('checkout')
          }}
          onGoToHome={handleBackToHome}
        />
      )}
      
      {currentScreen === 'search' && (
        <SearchScreen
          onSelectService={handleSelectService}
          onBack={handleBackToHome}
          onGoToHome={handleBackToHome}
        />
      )}
      
      {currentScreen === 'date' && (
        <DatePicker
          selectedDate={bookingData.date}
          onSelectDate={handleSelectDate}
          onBack={() => goToScreen('search')}
          onNext={() => goToScreen('time')}
          serviceName={bookingData.service?.name || 'your booking'}
          onGoToHome={handleBackToHome}
        />
      )}
      
      {currentScreen === 'time' && (
        <TimePicker
          selectedTime={bookingData.timeSlot}
          onSelectTime={handleSelectTime}
          onBack={() => goToScreen('date')}
          onNext={() => goToScreen('checkout')}
          serviceName={bookingData.service?.name || 'your booking'}
          selectedDate={bookingData.date}
          onGoToHome={handleBackToHome}
        />
      )}
      
      {currentScreen === 'checkout' && (
        <CheckoutScreen
          bookingData={bookingData}
          onBack={() => goToScreen('detail')}
          onConfirm={handleConfirmBooking}
          onGoToHome={handleBackToHome}
        />
      )}
      
      {currentScreen === 'confirmation' && confirmation && (
        <ConfirmationScreen
          booking={confirmation}
          onBackToHome={handleBackToHome}
          onViewBooking={handleViewBooking}
          onGoToHome={handleBackToHome}
        />
      )}
    </div>
  )
}
