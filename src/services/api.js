import axios from "axios";
import { API_BASE_PATH } from "../config/appConfig";
const api = axios.create({
  baseURL: API_BASE_PATH,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;