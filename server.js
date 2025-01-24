const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rideRoutes = require('./src/routes/rideRoutes');
const errorHandler = require('./src/middleware/errorMiddleware');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});

// Add mongoose connection error handler
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/rides', rideRoutes);

// Error Handling Middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});