// Environment configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const config = {
  apiUrl: API_BASE_URL,
  socketUrl: API_BASE_URL,
  environment: import.meta.env.MODE || 'development'
};