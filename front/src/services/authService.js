import axios from 'axios';

const API_URL = '/api/auth/';

const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  if (response.data.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const getProfile = async () => {
  const user = getCurrentUser();
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  };
  const response = await axios.get(API_URL + 'profile', config);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getProfile
};

export default authService;
