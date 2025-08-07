import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  // baseURL: import.meta.env.VITE_API_BASE_URL || "https://tourism-management-server-two-amber.vercel.app",
});

export default axiosInstance;
