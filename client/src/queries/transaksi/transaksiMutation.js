import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useCreateTransaksi = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData) => {
      const res = await axiosInstance.post(`/transaksi/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
    mutationFn: async (formData) => {
      const res = await axiosInstance.post(
        `/transaksi/create/${formData.get("penjahitId")}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
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

export const useRejectTransaksi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (transaksiData) => {
      const res = await axiosInstance.put(
        `/transaksi/reject/${transaksiData.transaksiId}`,
        transaksiData
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transaksiById"]);
      toast.success("Transaksi telah ditolak");
    },
    onError: (error) => {
      console.error(
        "Gagal menerima transaksi:",
        error.response?.data || error.message
      );
    },
  });
};

export const useFinishTransaksi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (transaksiData) => {
      const res = await axiosInstance.put(
        `/transaksi/finish/${transaksiData.get("transaksiId")}`,
        transaksiData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transaksiById"]);
      toast.success("Transaksi telah selesai");
    },
    onError: (error) => {
      console.error(
        "Gagal menyelesaikan transaksi:",
        error.response?.data || error.message
      );
    },
  });
};

export const useReviewTransaksi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosInstance.put(
        `/transaksi/review/${reviewData.get("transaksiId")}`,
        reviewData
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transaksiById"]);
      toast.success("Review berhasil ditambahkan");
    },
    onError: (error) => {
      console.error(
        "Gagal membuat review transaksi:",
        error.response?.data || error.message
      );
    },
  });
};
