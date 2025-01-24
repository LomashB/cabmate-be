const Ride = require('../models/Ride');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Create a new ride
// @route   POST /api/rides
exports.createRide = asyncHandler(async (req, res) => {
  const {
    type,
    pickup,
    dropoff,
    vehicleType,
    date,
    time,
    passengers,
    price
  } = req.body;

  const ride = await Ride.create({
    type,
    pickup,
    dropoff,
    vehicleType,
    date,
    time,
    passengers,
    price
  });

  res.status(201).json({
    success: true,
    data: ride
  });
});

// @desc    Get all rides
// @route   GET /api/rides
exports.getAllRides = asyncHandler(async (req, res) => {
  try {
    const rides = await Ride.find({}).maxTimeMS(20000);

    res.status(200).json({
      success: true,
      count: rides.length,
      data: rides
    });
  } catch (error) {
    console.error('Error fetching rides:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching rides. Please try again.'
    });
  }
});

// @desc    Search rides based on query parameters
// @route   GET /api/rides/search
exports.searchRides = asyncHandler(async (req, res) => {
  const { 
    type, 
    pickup, 
    dropoff, 
    vehicleType, 
    minPrice, 
    maxPrice 
  } = req.query;

  // Create a filter object dynamically
  const filter = {};

  if (pickup) filter['pickup.location'] = { $regex: pickup, $options: 'i' };
  if (dropoff) filter['dropoff.location'] = { $regex: dropoff, $options: 'i' };
  
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const rides = await Ride.find(filter);

  res.status(200).json({
    success: true,
    count: rides.length,
    data: rides
  });
});