import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const auth = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
};

// Parent endpoints
export const parent = {
  enrollChild: (childData) => api.post('/parents/enroll', childData),
  getChildren: () => api.get('/parents/children'),
  scheduleTour: (tourData) => api.post('/parents/schedule-tour', tourData),
};

// Babysitter endpoints
export const babysitter = {
  getSchedule: () => api.get('/babysitters/schedule'),
  updateAvailability: (availability) => api.put('/babysitters/availability', availability),
  getChildren: () => api.get('/babysitters/children'),
};

// Manager endpoints
export const manager = {
  getStaff: () => api.get('/managers/staff'),
  getEnrollments: () => api.get('/managers/enrollments'),
  getTours: () => api.get('/managers/tours'),
  approveEnrollment: (enrollmentId) => api.put(`/managers/enrollments/${enrollmentId}/approve`),
};

export default api; 