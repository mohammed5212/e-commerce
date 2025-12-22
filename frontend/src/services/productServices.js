import { axiosInstance } from "../axios/axiosInstance";

/* GET ALL PRODUCTS */
export const getProducts = async () => {
  const res = await axiosInstance.get(
   "product/listProducts"
  );
  return res.data;
};

/* CREATE PRODUCT */
export const createProduct = async (data) => {
  const res = await axiosInstance.post(
    "/product",
    data
  );
  return res.data;
};

/* UPDATE PRODUCT */
export const updateProduct = async (id, data) => {
  const res = await axiosInstance.put(
    `product/update/${id}`,
    data
  );
  return res.data;
};

/* DELETE PRODUCT */
export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(
    `product/delete/${id}`
  );
  return res.data;
};