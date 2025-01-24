const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  // Based on the frontend components, here are suggested fields
  type: {
    type: String, 
    enum: ['City Rides','Local','Airport', 'Outstation', 'Airport Transfer', 'Hourly Rental'],
    required: true
  },
  pickup: {
    location: { type: String, required: true },
    address: { type: String },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number }
    }
  },
  dropoff: {
    location: { type: String, required: true },
    address: { type: String },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number }
    }
  },
  vehicleType: {
    type: String,
    enum: ['Sedan', 'SUV', 'Luxury', 'Hatchback'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  passengers: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  distance: {
    type: Number
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Ride', RideSchema);