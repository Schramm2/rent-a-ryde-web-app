import axios from 'axios';

const api = axios.create({
  baseURL: '/api/' // frontend will proxy this to backend
});

// Token management utilities
export const getAuthToken = () => {
  // Check localStorage first (for "Remember me" users)
  const localToken = localStorage.getItem('authToken');
  if (localToken) {
    return localToken;
  }
  
  // Fall back to sessionStorage (for session-only users)
  const sessionToken = sessionStorage.getItem('authToken');
  if (sessionToken) {
    return sessionToken;
  }
  
  return null;
};

export const getUserUid = () => {
  // Check localStorage first (for "Remember me" users)
  const localUid = localStorage.getItem('userUid');
  if (localUid) {
    return localUid;
  }
  
  // Fall back to sessionStorage (for session-only users)
  const sessionUid = sessionStorage.getItem('userUid');
  if (sessionUid) {
    return sessionUid;
  }
  
  return null;
};

export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userUid');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('userUid');
};

// Add request interceptor to automatically include auth token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired, clear auth data
      clearAuthData();
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;