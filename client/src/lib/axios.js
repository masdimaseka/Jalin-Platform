import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://jalin-platform-api.vercel.app/api",
  withCredentials: true,
});
