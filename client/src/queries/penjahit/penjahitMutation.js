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
      navigate("/" + status);
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Registrasi gagal!");
    },
  });
};
