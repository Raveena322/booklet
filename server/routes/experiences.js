import express from 'express';
import Experience from '../models/Experience.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// GET /experiences - Return list of experiences
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find({}).select('-__v').lean();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /experiences/:id - Return details and slot availability
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id).lean();
    
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    // Get bookings for this experience to check availability
    const bookings = await Booking.find({
      experience: req.params.id,
      date: req.query.date ? new Date(req.query.date) : { $gte: new Date() },
      status: { $ne: 'cancelled' }
    }).lean();

    // Calculate available slots for the date
    const selectedDate = req.query.date ? new Date(req.query.date) : null;
    const timeSlots = experience.timeSlots || [];
    
    const slotAvailability = timeSlots.map(slot => {
      if (selectedDate) {
        const bookingsForSlot = bookings.filter(
          b => b.timeSlot === slot.time && 
          new Date(b.date).toDateString() === selectedDate.toDateString()
        );
        const bookedQuantity = bookingsForSlot.reduce((sum, b) => sum + (b.quantity || 1), 0);
        const available = experience.maxCapacity - bookedQuantity;
        
        return {
          ...slot,
          available: available > 0,
          left: available,
          totalCapacity: experience.maxCapacity
        };
      }
      return slot;
    });

    res.json({
      ...experience,
      slotAvailability,
      bookings: bookings.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


