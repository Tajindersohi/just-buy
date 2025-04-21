import axios from "axios";
import { showError, showSuccess } from "././Assets/Constants/showNotifier";
import { Navigate } from "react-router-dom";
const axiosInstance = axios.create({
  baseURL: process.env.APP_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    showError(error?.response || "")
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    showSuccess(response?.data?.message || "Success")
    return response;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.clear();
      // window.location.href = "/";
    }
    showError(err?.response || "Unprocessable")
    return Promise.reject(err);
  }
);

export default axiosInstance;
