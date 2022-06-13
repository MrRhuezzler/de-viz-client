import axios from "axios";
import { AUTH_LOCAL_STORAGE } from "../hooks/authContext";
import { AUTH_REFRESH_TOKEN, BASE_URL } from "./endpoints";

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    // "Access-Control-Allow-Origin": "http://localhost:5000",
  },
});

// API.interceptors.request.use(
//     (config) => {
//         const token =
//     }
// )

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === AUTH_REFRESH_TOKEN
    ) {
      localStorage.removeItem(AUTH_LOCAL_STORAGE);
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const tokens = localStorage.getItem(AUTH_LOCAL_STORAGE);

      if (!tokens) {
        localStorage.removeItem(AUTH_LOCAL_STORAGE);
        window.location.href = "/login";
        return Promise.reject(error);
      }

      const parsedTokens = JSON.parse(tokens);
      const res = await API.post(AUTH_REFRESH_TOKEN, {
        refreshToken: parsedTokens.refreshToken,
      });

      const data = res.data.data;
      localStorage.setItem(AUTH_LOCAL_STORAGE, JSON.stringify(data));
      // API.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${data.accessToken}`;

      return await API(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default API;
