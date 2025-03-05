// src/axiosSetup.ts
import axios from "axios";
import { toast } from "react-toastify";

// Create an axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: "https://everydaynft.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor to catch 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear tokens from storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.error("Session expired. Please log in again.");
      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
