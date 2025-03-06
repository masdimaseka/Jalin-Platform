import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

export const useLoginAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) => axiosInstance.post("/admin/login", userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authAdmin"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });
};

export const useLogoutAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/admin/logout");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authAdmin"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });
};

export const useVerifyPenjahit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (penjahitId) => {
      await axiosInstance.post(`/admin/verify/${penjahitId}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["penjahit"]);
    },
    onError: (error) => {
      console.error("Gagal memverifikasi penjahit:", error);
    },
  });
};
