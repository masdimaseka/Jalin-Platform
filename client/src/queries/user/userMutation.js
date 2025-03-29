import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUpdateProfile = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (updateData) => {
      const res = await axiosInstance.put(
        `/user/update/${updateData.id}`,
        updateData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profil berhasil diperbarui!");
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Gagal memperbarui profil!");
    },
  });
};
