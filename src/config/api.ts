// API Configuration with Environment Detection
// Automatically switches between local development and production
const isDevelopment = 
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname.includes('.local');

const BASE_URL = isDevelopment 
  ? 'http://localhost:3001'
  : 'https://chimirota-backend.onrender.com';

// Log current configuration for debugging
console.log('🔧 API Configuration:', {
  hostname: window.location.hostname,
  isDevelopment,
  BASE_URL
});

export { BASE_URL };