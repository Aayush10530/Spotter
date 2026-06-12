import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const register = async (username, email, password) => {
  try {
    const response = await api.post('auth/register/', { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Signup failed.');
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post('auth/login/', { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Login failed.');
  }
};

export const planTrip = async (tripData) => {
  try {
    const response = await api.post('plan-trip/', tripData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('Error processing request.');
    }
  }
};

export const listTrips = async () => {
  try {
    const response = await api.get('trips/');
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to retrieve history.');
  }
};

export const deleteTrip = async (id) => {
  try {
    const response = await api.delete(`trips/${id}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Failed to delete trip.');
  }
};