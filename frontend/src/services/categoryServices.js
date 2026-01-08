import { adminAxios } from "@/axios/adminAxios";

export const getCategories = () =>
  adminAxios.get("/category");

export const createCategory = (data) =>
  adminAxios.post("/category", data);

export const updateCategory = (id, data) =>
  adminAxios.put(`/category/${id}`, data);

export const deleteCategory = (id) =>
  adminAxios.delete(`/category/${id}`);
