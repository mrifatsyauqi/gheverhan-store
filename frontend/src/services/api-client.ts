import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Required for Sanctum cookie-based auth
});

// Request interceptor to attach CSRF token if needed
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // If you need to hit sanctum/csrf-cookie manually before non-GET requests:
    // This is often done at the app init or login phase rather than every request.
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthenticated (e.g., redirect to login or clear state)
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
