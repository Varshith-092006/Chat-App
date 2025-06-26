import axios from "axios";

const BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

export const axiosInstance = axios.create({
  baseURL: `${BASE}/api`,
  withCredentials: true,
});