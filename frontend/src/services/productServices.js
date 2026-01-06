import { userAxios } from "../axios/userAxios";
import { adminAxios } from "../axios/adminAxios";

/* =======================
   PUBLIC / USER
======================= */

export const getProducts = async () => {
  const res = await userAxios.get("/product");
  return res.data;
};

export const getProductById = (id) => {
  return userAxios.get(`/product/${id}`);
};

/* =======================
   ADMIN ONLY
======================= */

export const createProduct = async (data) => {
  const res = await adminAxios.post("/product", data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await adminAxios.put(`/product/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
    console.log("DELETE URL:", `/product/${id}`);
  const res = await adminAxios.delete(`/product/${id}`);
  return res.data;
};
