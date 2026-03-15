import axios from "axios";
import responseInterceptor from "./response.interceptor";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
responseInterceptor(axiosInstance);

export default axiosInstance;
