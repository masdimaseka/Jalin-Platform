import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useCreateTransaksi = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (transaksiData) => {
      const res = await axiosInstance.post(`/transaksi/create`, transaksiData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transaksi"]);

      const status = "transaksi-created";
      navigate("/status/" + status);
    },
    onError: (error) => {
      console.error(
        "Gagal membuat transaksi:",
        error.response?.data || error.message
      );
    },
  });
};

export const useCreateTransaksiToPenjahit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (transaksiData) => {
      const res = await axiosInstance.post(
        `/transaksi/create/${transaksiData.penjahitId}`,
        transaksiData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transaksi"]);

      const status = "transaksi-created";
      navigate("/status/" + status);
    },
    onError: (error) => {
      console.error(
        "Gagal membuat transaksi:",
        error.response?.data || error.message
      );
    },
  });
};

export const useAcceptTransaksi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (transaksiData) => {
      const res = await axiosInstance.put(
        `/transaksi/accept/${transaksiData.transaksiId}`,
        transaksiData
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transaksiById"]);
      toast.success("Transaksi berhasil diterima");
    },
    onError: (error) => {
      console.error(
        "Gagal menerima transaksi:",
        error.response?.data || error.message
      );
    },
  });
};
