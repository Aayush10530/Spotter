import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const planTrip = async (tripData) => {
  try {
    const response = await api.post('/plan-trip/', tripData);
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