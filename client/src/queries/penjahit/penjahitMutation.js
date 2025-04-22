import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useRegisterPenjahit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (registerData) => {
      const res = await axiosInstance.post("/penjahit/register", registerData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success(
        "Pendaftaran Sedang Diproses, Mohon tunggu untuk Verifikasi!"
      );

      queryClient.invalidateQueries({ queryKey: ["penjahit"] });

      const status = "register-penjahit-on-review";
      navigate("/status/" + status);
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Registrasi gagal!");
    },
  });
};

export const useUpdateStatusPenjahit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateData) => {
      const res = await axiosInstance.put(
        `/penjahit/update/status/${updateData.id}`,
        updateData
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Status Diperbarui");

      queryClient.invalidateQueries({ queryKey: ["penjahitByIdUser"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Registrasi gagal!");
    },
  });
};

export const useUpdateProfilePenjahit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateData) => {
      const res = await axiosInstance.put(
        `/penjahit/update/${updateData.id}`,
        updateData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profil berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/penjahit/dashboard");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Gagal memperbarui profil!");
    },
  });
};

export const useCreateTransaksiPoint = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (transaksiData) => {
      const res = await axiosInstance.post(
        "/transaksi-point/create",
        transaksiData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Lakukan Pembayaran");
      navigate("/penjahit/dashboard");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Gagal membuat transaksi!");
    },
  });
};
