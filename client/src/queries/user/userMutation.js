import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const res = await axiosInstance.put(
        `/user/${formData.get("id")}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profil berhasil diperbarui!");
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Gagal memperbarui profil!");
    },
  });
};
