import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.jalin.my.id/api",
  withCredentials: true,
});
