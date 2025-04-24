import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "production"
      ? "https://api.jalin.my.id/api"
      : "http://localhost:5000/api",
  withCredentials: true,
});
