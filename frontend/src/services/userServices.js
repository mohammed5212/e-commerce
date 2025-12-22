

import { use } from "react";
import  {axiosInstance}  from "../axios/axiosInstance";

export const listProducts=() => {
    return axiosInstance.get('/products/listproducts');
};
export const registerUser = (userData) => {
    return axiosInstance.post('/user/register', userData);
};

export const loginUser = (userRes) => {
    return axiosInstance.post('/user/login',userRes );
}
export const loginAdmin= (adminRes) => {
    return axiosInstance.post('/admin/login',adminRes );
}
export const logout = () => {
  return axiosInstance.get("/auth/logout"); // or /admin/logout /user/logout
}

export const getMe = () => {
  return axiosInstance.get("/auth/me"); // or /admin/me /user/me
};
export const getProducts = async () => {
  const response = await axiosInstance.get("/product/listProducts");
  return response.data;
};

export const createProduct = (data) =>
  axiosInstance.post("/admin/products", data);

export const updateProduct = (id, data) =>
  axiosInstance.put(`/admin/products/${id}`, data);

export const deleteProduct = (id) =>
  axiosInstance.delete(`/admin/products/${id}`);