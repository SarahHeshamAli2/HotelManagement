// axios instance
import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://upskilling-egypt.com:3000/api/v0";
const IMAGE_URL = "https://upskilling-egypt.com:3000";

const axiosInstance: AxiosInstance = axios.create({
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
  registerAdmin: `/admin/users`,
  registerUser: `/portal/users`,
  verify: ``,
  forgetPassword: ``,
  resetPassword: ``,
  changePassword: ``,
};
export const getDashboard = `${BASE_URL}/admin/dashboard`;


export { axiosInstance, IMAGE_URL };