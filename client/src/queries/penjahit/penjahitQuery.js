import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const usePenjahit = () => {
  return useQuery({
    queryKey: ["penjahit"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/penjahit");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        toast.error(err.response.data.message || "Something went wrong");
        return null;
      }
    },
  });
};

export const usePenjahitById = (id) => {
  return useQuery({
    queryKey: ["penjahitById"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/penjahit/${id}`);
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        toast.error(err.response.data.message || "Something went wrong");
        return null;
      }
    },
  });
};

export const usePenjahitByIdUser = (id) => {
  return useQuery({
    queryKey: ["penjahitByIdUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/penjahit/user/${id}`);
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        toast.error(err.response.data.message || "Something went wrong");
        return null;
      }
    },
  });
};

export const usePenjahitPremium = () => {
  return useQuery({
    queryKey: ["penjahitPremium"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/penjahit/premium");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        toast.error(err.response.data.message || "Something went wrong");
        return null;
      }
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/categories");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        toast.error(err.response.data.message || "Something went wrong");
        return null;
      }
    },
  });
};

export const usePointProducts = () => {
  return useQuery({
    queryKey: ["pointProducts"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/point-product");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        toast.error(err.response.data.message || "Something went wrong");
        return null;
      }
    },
  });
};

export const usePointProductsById = (id) => {
  return useQuery({
    queryKey: ["pointProductById"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/point-product/${id}`);
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        toast.error(err.response.data.message || "Something went wrong");
        return null;
      }
    },
  });
};
