import axios from "axios";

export const BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || "https://the-uniques-portal.vercel.app";

// Log active backend URL for immediate debugging in browser console
console.log(
  `%c[API Config]%c Active Backend URL: %c${BASE_URL}`,
  "color: #ca0019; font-weight: bold;",
  "color: inherit;",
  "color: #0284c7; font-weight: bold; text-decoration: underline;"
);

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
