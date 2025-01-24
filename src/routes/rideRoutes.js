const express = require('express');
const { 
  createRide, 
  getAllRides, 
  searchRides 
} = require('../controllers/rideController');

const router = express.Router();

router.route('/')
  .post(createRide)
  .get(getAllRides);

router.get('/search', searchRides);

module.exports = router;