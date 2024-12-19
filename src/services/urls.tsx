// axios instance
import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://upskilling-egypt.com:3000/api/v0";
const IMAGE_URL = "https://upskilling-egypt.com:3000";



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
  registerAdmin: `/admin/users`,
  registerUser: `/portal/users`,
  login: '/admin/users/login',
  register: ``,
  verify: ``,
  forgetPassword:`/admin/users/forgot-password`,
  resetPassword: `/admin/users/reset-password`,
  changePassword: `/admin/users/change-password`,
};

//  FACILITIES 
export const FACILITIES_URLS = {
  GET_FACILITIES:`/admin/room-facilities`,
  ADD_FACILITIES:`/admin/room-facilities`
}



export const getDashboard = `${BASE_URL}/admin/dashboard`;
export const ROOMS_URLS ={
  GET_ALL_ROOMS:`/admin/rooms`
}

export const BOOKING_URLS ={
  GET_ALL_BOOKINGS:`/admin/booking`
}

export const getUsersData = '/admin/users';

export { axiosInstance, IMAGE_URL };
