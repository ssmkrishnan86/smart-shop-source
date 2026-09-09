export const ENV = {
  APP_NAME: import.meta.env.VITE_APP_NAME || 'SmartShop Enterprise',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.smartshop.example.com/v1',
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API === 'true' || true,
  DEFAULT_LANGUAGE: import.meta.env.VITE_DEFAULT_LANGUAGE || 'en',
  DEFAULT_CURRENCY: import.meta.env.VITE_DEFAULT_CURRENCY || 'USD',
};
