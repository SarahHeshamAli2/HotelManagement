// axios instance
import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://upskilling-egypt.com:3003/api/v1';



 const axiosInstance:AxiosInstance = axios.create({
  baseURL: BASE_URL,
  
});


// axios interceptors
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//* USER AUTHENTICATION
export const AUTH_URLS = {
  login: ``,
  register: ``,
  verify: ``,
  forgetPassword:``,
  resetPassword: ``,
  changePassword: ``,

};

