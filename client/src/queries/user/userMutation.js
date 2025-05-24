import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUpdateProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateData) => {
      const res = await axiosInstance.put(
        `/user/update/${updateData.id}`,
        updateData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profil berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Gagal memperbarui profil!");
    },
  });
};
