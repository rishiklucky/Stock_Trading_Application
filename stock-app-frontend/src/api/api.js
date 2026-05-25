import axios from "axios";

// central location for backend URL
export const BASE_URL = "http://localhost:8080";

// axios instance configured with the shared base URL
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// keep a default export for compatibility
export default axiosInstance;
