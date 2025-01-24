// Utility to wrap async route handlers and avoid try-catch in every controller
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
  module.exports = asyncHandler;