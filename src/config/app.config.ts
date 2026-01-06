// Cấu hình ứng dụng
export const appConfig = {
  name: 'thonglyngoccv',
  version: '0.0.0',
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
  },
  features: {
    // Các tính năng của app
  },
} as const;

