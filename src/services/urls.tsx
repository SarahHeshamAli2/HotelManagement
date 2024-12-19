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

//  FACILITIES 
export const FACILITIES_URLs = {
  GET_FACILITIES:`/admin/room-facilities`,
  ADD_FACILITIES:`/admin/room-facilities`,
  UPDATE_FACILITIES: (Id: string) => `/admin/room-facilities/${Id}`,
}



export const getDashboard = `${BASE_URL}/admin/dashboard`;
export const ROOMS_URLS = {
  GET_ALL_ROOMS: `/admin/rooms`,
  DELETE_ROOM:(id:string)=>`/admin/rooms/${id}`
};

export const Ads_URLS = {
  getAllAds: "/admin/ads",
  createNewAd: "/admin/ads",
  UpdateAd: (adId: string) => `admin/ads/${adId}`,
  getAdById: (adId: string) => `/admin/ads/${adId}`,
  DeleteAd: (adId: string) => `/admin/ads/${adId}`,

};

export const BOOKING_URLS = {
  GET_ALL_BOOKINGS: `/admin/booking`,
};

export const getUsersData = "/admin/users";

// Room endpoints
export const ROOM_URLS = {
  createRoom: `/admin/rooms`,
};

//facilities endpoints
export const FACILITIES_URLS = {
  getFacilities: `/admin/room-facilities`,
};

export { axiosInstance, IMAGE_URL };
