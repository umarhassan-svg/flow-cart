// src/api/axios.ts
import axios from "axios";
import type { AxiosInstance } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false, // set to true if you use cookies
});

// Helper to set/remove Authorization header
export const setAuthToken = (token?: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// A callback the app can register to run on 401 (unauthorized)
let onUnauthorizedCallback: (() => void) | null = null;
export const setOnUnauthorized = (cb: (() => void) | null) => {
  onUnauthorizedCallback = cb;
};

// Global response interceptor to catch 401s
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      // fire the callback if registered (e.g., to logout)
      onUnauthorizedCallback?.();
    }
    return Promise.reject(error);
  }
);

export default api;
