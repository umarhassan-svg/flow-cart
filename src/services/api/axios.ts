// src/api/axios.ts
import axios, { type AxiosInstance,type AxiosRequestConfig, AxiosError } from "axios";
import AuthService from "../auth.service";
import type { InternalAxiosRequestConfig } from "axios";


const BASE_URL  = import.meta.env.VITE_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false, // change if you use cookies
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor: attach access token when available
 */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = AuthService.getAccessToken();
  console.log(BASE_URL)
  
  if (token) {
    config.headers = config.headers || {}; // ensure headers is always defined
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * Response interceptor: on 401 attempt refresh once and retry
 * Uses AuthService.refresh() which handles queuing.
 */
api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as AxiosRequestConfig & { _retry?: boolean };

    if (err.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        await AuthService.refresh(); // will throw if refresh fails
        // after refresh, retry original request with new token
        const token = AuthService.getAccessToken();
        if (token && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return api(originalRequest);
      } catch (refreshErr) {
        // refresh failed -> ensure logout happens (AuthService handles cleanup)
        AuthService.clearAuth(); // optional double-check
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);


export default api;
