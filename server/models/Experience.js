import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  availableDates: [{
    type: Date
  }],
  timeSlots: [{
    time: String,
    available: Boolean
  }],
  maxCapacity: {
    type: Number,
    default: 10
  }
}, {
  timestamps: true
});

export default mongoose.model('Experience', experienceSchema);


