import express from 'express';
import Booking from '../models/Booking.js';
import Experience from '../models/Experience.js';
import Promo from '../models/Promo.js';

const router = express.Router();

// POST /bookings - Accept booking details and store them
router.post('/', async (req, res) => {
  try {
    const {
      experienceId,
      date,
      timeSlot,
      quantity,
      customerName,
      customerEmail,
      customerPhone,
      promoCode,
      notes
    } = req.body;

    // Validation
    if (!experienceId || !date || !timeSlot || !customerName || !customerEmail) {
      return res.status(400).json({ 
        error: 'Missing required fields: experienceId, date, timeSlot, customerName, customerEmail' 
      });
    }

    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    // Check if experience exists
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    // Check availability - prevent double-booking
    const bookingDate = new Date(date);
    const startOfDay = new Date(bookingDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(bookingDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const existingBookings = await Booking.find({
      experience: experienceId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      timeSlot: timeSlot,
      status: { $ne: 'cancelled' }
    });

    const bookedQuantity = existingBookings.reduce((sum, b) => sum + (b.quantity || 1), 0);
    const available = (experience.maxCapacity || 10) - bookedQuantity;

    if (quantity > available) {
      return res.status(400).json({ 
        error: `Only ${available} slots available for this time slot` 
      });
    }

    // Calculate pricing
    const basePrice = experience.price || 999;
    const subtotal = basePrice * quantity;
    
    // Apply promo code if provided
    let discount = 0;
    let appliedPromo = null;
    if (promoCode) {
      appliedPromo = await Promo.findOne({ 
        code: promoCode.toUpperCase(),
        isActive: true,
        validFrom: { $lte: new Date() },
        validUntil: { $gte: new Date() }
      });

      if (appliedPromo) {
        if (!appliedPromo.usageLimit || appliedPromo.usedCount < appliedPromo.usageLimit) {
          if (subtotal >= (appliedPromo.minAmount || 0)) {
            if (appliedPromo.discountType === 'percentage') {
              discount = (subtotal * appliedPromo.discountValue) / 100;
              if (appliedPromo.maxDiscount) {
                discount = Math.min(discount, appliedPromo.maxDiscount);
              }
            } else {
              discount = appliedPromo.discountValue;
            }
          }
        }
      }
    }

    const afterDiscount = subtotal - discount;
    const taxes = Math.round(afterDiscount * 0.18);
    const total = afterDiscount + taxes;

    // Generate unique IDs
    const bookingId = `BK${Date.now()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const referenceNumber = `REF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Create booking
    const booking = new Booking({
      bookingId,
      referenceNumber,
      experience: experienceId,
      date: bookingDate,
      timeSlot,
      quantity,
      customerName,
      customerEmail,
      customerPhone: customerPhone || '',
      subtotal: afterDiscount,
      taxes,
      total,
      promoCode: promoCode || null,
      discount,
      status: 'confirmed'
    });

    await booking.save();

    // Update promo usage count
    if (appliedPromo) {
      appliedPromo.usedCount += 1;
      await appliedPromo.save();
    }

    // Populate experience details
    await booking.populate('experience');

    res.status(201).json({
      ...booking.toObject(),
      message: 'Booking confirmed successfully'
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Duplicate booking detected' });
    }
    res.status(500).json({ error: error.message });
  }
});

// GET /bookings/:referenceNumber - Get booking by reference
router.get('/:referenceNumber', async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      referenceNumber: req.params.referenceNumber 
    }).populate('experience');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

