// centralized API configuration
// read host from VITE_APP_HOST (set in .env) or fall back to production

export const BASE = import.meta.env.VITE_APP_HOST || "https://theuniquesbackend.vercel.app";
export const API_BASE = `${BASE}/api`;
export const AUTH_BASE = `${BASE}/auth`;
export const UPLOAD_BASE = `${BASE}/uploads`;

// helper for endpoints that only need the base host
export default {
  BASE,
  API_BASE,
  AUTH_BASE,
  UPLOAD_BASE,
};