import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useAuthUser = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/check-auth");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        return null;
      }
    },
  });
};

export const useAuthPenjahit = () => {
  return useQuery({
    queryKey: ["authPenjahit"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/check-auth-penjahit");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        return null;
      }
    },
  });
};
