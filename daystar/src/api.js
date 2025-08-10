import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auth endpoints
export const auth = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
};

// Operations endpoints
export const operations = {
    getManagers: () => api.get('/operations/managers'),
    createManager: (managerData) => api.post('/operations/managers', managerData),
};

// Schedule endpoints
export const schedules = {
    getSchedules: () => api.get('/schedules'),
    createSchedule: (scheduleData) => api.post('/schedules', scheduleData),
    updateSchedule: (id, scheduleData) => api.put(`/schedules/${id}`, scheduleData),
    deleteSchedule: (id) => api.delete(`/schedules/${id}`),
};

// Incident endpoints
export const incidents = {
    getIncidents: () => api.get('/incidents'),
    createIncident: (incidentData) => api.post('/incidents', incidentData),
    updateIncident: (id, incidentData) => api.put(`/incidents/${id}`, incidentData),
};

// Expenses endpoints
export const expenses = {
    getExpenses: () => api.get('/expenses'),
    createExpense: (expenseData) => api.post('/expenses', expenseData),
    updateExpense: (id, expenseData) => api.put(`/expenses/${id}`, expenseData),
};

// Parent Payments endpoints
export const parentPayments = {
    getPayments: () => api.get('/parentpayments'),
    createPayment: (paymentData) => api.post('/parentpayments', paymentData),
    updatePayment: (id, paymentData) => api.put(`/parentpayments/${id}`, paymentData),
};

// Babysitter endpoints
export const babysitters = {
    getBabysitters: () => api.get('/babysitter'),
    createBabysitter: (babysitterData) => api.post('/babysitter', babysitterData),
    updateBabysitter: (id, babysitterData) => api.put(`/babysitter/${id}`, babysitterData),
};

export default {
    auth,
    operations,
    schedules,
    incidents,
    expenses,
    parentPayments,
    babysitters,
}; 