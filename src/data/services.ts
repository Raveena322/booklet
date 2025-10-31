import type { BookingService } from '../types'

export const SERVICES: BookingService[] = [
  {
    id: 'conference-room-1',
    name: 'Conference Room A',
    description: 'Spacious meeting room with AV equipment',
    category: 'Room',
    location: 'Floor 3',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600',
  },
  {
    id: 'conference-room-2',
    name: 'Conference Room B',
    description: 'Medium-sized meeting space with whiteboard',
    category: 'Room',
    location: 'Floor 2',
    imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1600',
  },
  {
    id: 'co-working-space',
    name: 'Co-working Space',
    description: 'Shared workspace with high-speed internet',
    category: 'Space',
    location: 'Floor 1',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600',
  },
  {
    id: 'studio-hire',
    name: 'Photography Studio',
    description: 'Professional studio with lighting equipment',
    category: 'Studio',
    location: 'Basement',
    imageUrl: 'https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?q=80&w=1600',
  },
  {
    id: 'training-room',
    name: 'Training Hall',
    description: 'Large hall suitable for workshops and seminars',
    category: 'Room',
    location: 'Floor 4',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600',
  },
  {
    id: 'event-space',
    name: 'Event Space',
    description: 'Flexible event venue for parties and gatherings',
    category: 'Space',
    location: 'Ground Floor',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600',
  },
]

export function searchServices(query: string): BookingService[] {
  const q = query.toLowerCase().trim()
  if (!q) return SERVICES
  return SERVICES.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.location?.toLowerCase().includes(q)
  )
}




