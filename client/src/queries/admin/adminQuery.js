import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useAuthAdmin = () => {
  return useQuery({
    queryKey: ["authAdmin"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/admin/check-admin");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        toast.error(err.response.data.message || "Something went wrong");
        return null;
      }
    },
  });
};

export const usePenjahitByAdmin = () => {
  return useQuery({
    queryKey: ["penjahitByAdmin"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/admin/penjahit");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        toast.error(err.response.data.message || "Something went wrong");
        return null;
      }
    },
  });
};

export const useUserByAdmin = () => {
  return useQuery({
    queryKey: ["userByAdmin"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/admin/user");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        toast.error(err.response.data.message || "Something went wrong");
        return null;
      }
    },
  });
};
