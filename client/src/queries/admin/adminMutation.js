import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
      await axiosInstance.post(`/admin/penjahit/verify/${penjahitId}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["penjahit"]);
      toast.success("berhasil diverifikasi!");
    },
    onError: (error) => {
      console.error("Gagal memverifikasi penjahit:", error);
    },
  });
};

export const useDeleteUserByIdByAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      await axiosInstance.delete(`/admin/user/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userByAdmin"]);
      toast.success("berhasil dihapus!");
    },
    onError: (error) => {
      console.error("Gagal menghapus user:", error);
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
};

export const useDeletePenjahitByIdByAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      await axiosInstance.delete(`/admin/penjahit/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["penjahitByAdmin"]);
      toast.success("berhasil dihapus!");
    },
    onError: (error) => {
      console.error("Gagal menghapus penjahit:", error);
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
};

export const useCreateCategoryByAdmin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (categoryData) => {
      await axiosInstance.post("/admin/category/register", categoryData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categoryByAdmin"]);
      navigate("/admin/category");
      toast.success("berhasil ditambahkan!");
    },
    onError: (error) => {
      console.error("Gagal menambahkan kategori:", error);
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
};

export const useDeleteCategoryByIdByAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId) => {
      await axiosInstance.delete(`/admin/category/${categoryId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categoryByAdmin"]);
      toast.success("berhasil dihapus!");
    },
    onError: (error) => {
      console.error("Gagal menghapus penjahit:", error);
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
};

export const useChangeUserPasswordByAdmin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData) => {
      console.log("Updated Data:", formData);
      await axiosInstance.put(`/admin/user/reset-password`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userByAdmin"]);
      navigate("/admin/user");
      toast.success("Password berhasil diubah!");
    },
    onError: (error) => {
      console.error("Gagal mengubah password:", error);
      toast.error(error.response.data.message || "Something went wrong");
    },
  });
};
