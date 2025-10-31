const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface Experience {
  _id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  imageUrl: string;
  price: number;
  timeSlots: Array<{ time: string; available: boolean }>;
  maxCapacity?: number;
}

export interface BookingRequest {
  experienceId: string;
  date: string;
  timeSlot: string;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  promoCode?: string;
  notes?: string;
}

export interface BookingResponse {
  bookingId: string;
  referenceNumber: string;
  experience: Experience;
  date: string;
  timeSlot: string;
  quantity: number;
  customerName: string;
  customerEmail: string;
  subtotal: number;
  taxes: number;
  total: number;
  message: string;
}

export interface PromoValidateRequest {
  code: string;
  amount?: number;
}

export interface PromoValidateResponse {
  valid: boolean;
  code?: string;
  discountType?: string;
  discountValue?: number;
  discount?: number;
  message?: string;
  error?: string;
}

// Fallback experiences data (used when backend is not available)
const FALLBACK_EXPERIENCES: Experience[] = [
  {
    _id: '1',
    name: 'Nandi Hills Sunrise',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
    category: 'Adventure',
    location: 'Bangalore',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800',
    price: 899,
    timeSlots: [
      { time: '07:00 AM', available: true },
      { time: '09:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '01:00 PM', available: true }
    ],
    maxCapacity: 10
  },
  {
    _id: '2',
    name: 'Coffee Trail',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
    category: 'Adventure',
    location: 'Coorg',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800',
    price: 1299,
    timeSlots: [
      { time: '07:00 AM', available: true },
      { time: '09:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '01:00 PM', available: true }
    ],
    maxCapacity: 10
  },
  {
    _id: '3',
    name: 'Kayaking',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
    category: 'Adventure',
    location: 'Udupi',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800',
    price: 999,
    timeSlots: [
      { time: '07:00 AM', available: true },
      { time: '09:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '01:00 PM', available: true }
    ],
    maxCapacity: 10
  },
  {
    _id: '4',
    name: 'Boat Cruise',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
    category: 'Adventure',
    location: 'Sunderban',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800',
    price: 999,
    timeSlots: [
      { time: '07:00 AM', available: true },
      { time: '09:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '01:00 PM', available: true }
    ],
    maxCapacity: 10
  },
  {
    _id: '5',
    name: 'Bunjee Jumping',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
    category: 'Adventure',
    location: 'Manali',
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73600?q=80&w=800',
    price: 999,
    timeSlots: [
      { time: '07:00 AM', available: true },
      { time: '09:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '01:00 PM', available: true }
    ],
    maxCapacity: 10
  }
];

// Fetch all experiences
export async function fetchExperiences(): Promise<Experience[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/experiences`);
    if (!response.ok) {
      throw new Error('Failed to fetch experiences');
    }
    const data = await response.json();
    // Return data if we got valid response with array
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    // If empty array or invalid response, use fallback
    return FALLBACK_EXPERIENCES;
  } catch (error) {
    // If API fails (backend not running, network error, etc.), use fallback data
    console.warn('API not available, using fallback data:', error);
    return FALLBACK_EXPERIENCES;
  }
}

// Fetch experience by ID with availability
export async function fetchExperience(id: string, date?: string): Promise<Experience & { slotAvailability?: any[] }> {
  const url = date 
    ? `${API_BASE_URL}/experiences/${id}?date=${date}`
    : `${API_BASE_URL}/experiences/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch experience');
  }
  return response.json();
}

// Create booking
export async function createBooking(booking: BookingRequest): Promise<BookingResponse> {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create booking');
  }

  return response.json();
}

// Validate promo code
export async function validatePromo(request: PromoValidateRequest): Promise<PromoValidateResponse> {
  const response = await fetch(`${API_BASE_URL}/promo/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  const data = await response.json();
  
  if (!response.ok) {
    return {
      valid: false,
      error: data.error || 'Failed to validate promo code'
    };
  }

  return data;
}

