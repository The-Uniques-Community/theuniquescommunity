/**
 * @file config.js
 * @description Global networking and client configuration module for The Uniques Community portal.
 * @architecture Configures the global Axios instance defaults, request interceptors for JWT injection,
 * and exports resolved URL endpoints (`BASE_URL` and `PORTAL_URL`) consumed across API calls, routing,
 * and service integrations targeting the backend Express server (`The-Uniques-Portal/server`).
 * @agent_note All outgoing Axios network requests inherit `withCredentials = true` and automatic `Authorization: Bearer <token>`
 * header injection if `localStorage.getItem("token")` is present. When modifying base URLs or adding endpoints, verify environment variable
 * naming conventions (`VITE_API_BASE_URL`, `VITE_PORTAL_URL`, `VITE_PORTAL_FRONTEND_URL`) and avoid trailing slashes.
 */

import axios from "axios";

/**
 * Resolved Backend API Base URL.
 * Directly targets the configured VITE_API_BASE_URL if set and non-empty.
 * Otherwise defaults to the canonical hosted backend URL.
 * @desc Resolves the root HTTP/HTTPS address for all backend API interactions with The-Uniques-Portal server.
 * @type {string}
 */
export const BASE_URL =
  import.meta.env?.VITE_API_BASE_URL && String(import.meta.env.VITE_API_BASE_URL).trim() !== ""
    ? String(import.meta.env.VITE_API_BASE_URL).trim().replace(/\/+$/, "")
    : "https://the-uniques-portal.vercel.app";

/**
 * Resolved Portal Frontend URL.
 * Directly targets the configured VITE_PORTAL_URL or VITE_PORTAL_FRONTEND_URL if set.
 * Otherwise defaults to the canonical hosted portal frontend URL.
 * @desc Resolves the base web address for external deep-links and redirects to the authenticated member portal.
 * @type {string}
 */
export const PORTAL_URL =
  (import.meta.env?.VITE_PORTAL_URL && String(import.meta.env.VITE_PORTAL_URL).trim() !== ""
    ? String(import.meta.env.VITE_PORTAL_URL).trim().replace(/\/+$/, "")
    : null) ||
  (import.meta.env?.VITE_PORTAL_FRONTEND_URL && String(import.meta.env.VITE_PORTAL_FRONTEND_URL).trim() !== ""
    ? String(import.meta.env.VITE_PORTAL_FRONTEND_URL).trim().replace(/\/+$/, "")
    : null) ||
  "https://the-uniques-portal.vercel.app";

// Log active backend & portal URLs for immediate debugging in browser console
console.log(
  `%c[API Config]%c Active Backend URL: %c${BASE_URL}`,
  "color: #ca0019; font-weight: bold;",
  "color: inherit;",
  "color: #0284c7; font-weight: bold; text-decoration: underline;"
);
console.log(
  `%c[Portal Config]%c Active Portal URL: %c${PORTAL_URL}`,
  "color: #ca0019; font-weight: bold;",
  "color: inherit;",
  "color: #10b981; font-weight: bold; text-decoration: underline;"
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

