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
  registerAdmin: `/admin/users`,
  registerUser: `/portal/users`,
  login: "/admin/users/login",
  register: ``,
  verify: ``,
  forgetPassword: `/admin/users/forgot-password`,
  resetPassword: `/admin/users/reset-password`,
  changePassword: `/admin/users/change-password`,
};

export const getDashboard = `${BASE_URL}/admin/dashboard`;

export const ROOMS_URLS = {
  getAllRooms: `/admin/rooms`,
  deleteRoom:(id:string)=>`/admin/rooms/${id}`
};

export const Ads_URLS = {
  getAllAds: "/admin/ads",
  createNewAd: "/admin/ads",
  UpdateAd: (AdId: boolean) => `admin/ads/${AdId}`,
  getAdById: (AdId: string) => `/admin/ads/${AdId}`,
  deleteAd:(id:string)=>`/admin/ads/${id}`

};

export const BOOKING_URLS = {
  getAllBookings: `/admin/booking`,
};

export const getUsersData = "/admin/users";

// Room endpoints
export const ROOM_URLS = {
  createRoom: `/admin/rooms`,
};

//facilities endpoints
export const FACILITIES_URLS = {
  getFacilities: `/admin/room-facilities`,
  deleteFacility:(id:string)=>`/admin/room-facilities/${id}`


};

export { axiosInstance, IMAGE_URL };
