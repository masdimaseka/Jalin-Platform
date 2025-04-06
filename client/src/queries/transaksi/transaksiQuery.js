import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

export const useTransaksi = () => {
  return useQuery({
    queryKey: ["transaksi"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/transaksi");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        toast.error(err.response.data.message || "Something went wrong");
        return null;
      }
    },
  });
};

export const useTransaksiPenjahit = (id, options = {}) => {
  return useQuery({
    queryKey: ["transaksiPenjahit"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/transaksi/penjahit/${id}`);
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        toast.error(err.response.data.message || "Something went wrong");
        return null;
      }
    },
    enabled: !!id,
    ...options,
  });
};
