import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://theuniquesportal-server.vercel.app";

axios.defaults.withCredentials = true;

// Automatically attach JWT token from localStorage if present
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.token = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
