import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

export const useCreateTransaksiToPenjahit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (transaksiData) => {
      const res = await axiosInstance.post(
        `/transaksi/create/${transaksiData.penjahitId}`,
        transaksiData
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
