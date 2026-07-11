// axios.js
// Centralized Axios instance used by every API call in the app.
// Using a single instance means base URL, timeouts and interceptors
// (e.g. for error handling) are configured in exactly one place.
//
// In development, Vite's proxy (see vite.config.js) forwards "/api/*"
// requests to the Flask backend on http://localhost:5000, so baseURL
// can simply stay relative. In production, set VITE_API_BASE_URL to
// your deployed backend's URL.

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global response interceptor: normalizes errors so components can rely
// on a consistent shape (err.message) regardless of what failed.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export default api;
