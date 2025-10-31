import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from './models/Experience.js';
import Promo from './models/Promo.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hd-booking';

const experiences = [
  {
    name: 'Nandi Hills Sunrise',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
    category: 'Adventure',
    location: 'Bangalore',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800',
    price: 899,
    availableDates: [],
    timeSlots: [
      { time: '07:00 AM', available: true },
      { time: '09:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '01:00 PM', available: true }
    ],
    maxCapacity: 10
  },
  {
    name: 'Coffee Trail',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
    category: 'Adventure',
    location: 'Coorg',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800',
    price: 1299,
    availableDates: [],
    timeSlots: [
      { time: '07:00 AM', available: true },
      { time: '09:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '01:00 PM', available: true }
    ],
    maxCapacity: 10
  },
  {
    name: 'Kayaking',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
    category: 'Adventure',
    location: 'Udupi',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800',
    price: 999,
    availableDates: [],
    timeSlots: [
      { time: '07:00 AM', available: true },
      { time: '09:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '01:00 PM', available: true }
    ],
    maxCapacity: 10
  },
  {
    name: 'Boat Cruise',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
    category: 'Adventure',
    location: 'Sunderban',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800',
    price: 999,
    availableDates: [],
    timeSlots: [
      { time: '07:00 AM', available: true },
      { time: '09:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '01:00 PM', available: true }
    ],
    maxCapacity: 10
  },
  {
    name: 'Bunjee Jumping',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
    category: 'Adventure',
    location: 'Manali',
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73600?q=80&w=800',
    price: 999,
    availableDates: [],
    timeSlots: [
      { time: '07:00 AM', available: true },
      { time: '09:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '01:00 PM', available: true }
    ],
    maxCapacity: 10
  }
];

const promoCodes = [
  {
    code: 'SAVE10',
    discountType: 'percentage',
    discountValue: 10,
    minAmount: 500,
    validUntil: new Date('2025-12-31'),
    usageLimit: 100
  },
  {
    code: 'FLAT100',
    discountType: 'fixed',
    discountValue: 100,
    minAmount: 1000,
    validUntil: new Date('2025-12-31'),
    usageLimit: 50
  },
  {
    code: 'WELCOME20',
    discountType: 'percentage',
    discountValue: 20,
    minAmount: 800,
    maxDiscount: 500,
    validUntil: new Date('2025-12-31'),
    usageLimit: 30
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Experience.deleteMany({});
    await Promo.deleteMany({});

    // Insert experiences
    const insertedExperiences = await Experience.insertMany(experiences);
    console.log(`Inserted ${insertedExperiences.length} experiences`);

    // Insert promo codes
    const insertedPromos = await Promo.insertMany(promoCodes);
    console.log(`Inserted ${insertedPromos.length} promo codes`);

    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();


