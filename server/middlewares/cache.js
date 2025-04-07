const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache duration

const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    // Skip caching if it's a POST, PUT, DELETE request
    if (req.method !== 'GET') {
      return next();
    }
    
    // Create a custom cache key based on the URL and query parameters
    const cacheKey = `${req.originalUrl}`;
    
    // Check if we have a cache hit
    const cachedResponse = cache.get(cacheKey);
    
    if (cachedResponse) {
      // Return cached response
      return res.json(cachedResponse);
    }
    
    // Store original send method
    const originalSend = res.json;
    
    // Override res.json method
    res.json = function (body) {
      // Store response in cache
      cache.set(cacheKey, body, duration);
      
      // Call original send method
      originalSend.call(this, body);
    };
    
    next();
  };
};

module.exports = cacheMiddleware;