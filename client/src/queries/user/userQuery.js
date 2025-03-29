import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/user");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        toast.error(err.response.data.message || "Something went wrong");
        return null;
      }
    },
  });
};

export const useUserById = (id) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/user/${id}`);
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        toast.error(err.response.data.message || "Something went wrong");
        return null;
      }
    },
  });
};
