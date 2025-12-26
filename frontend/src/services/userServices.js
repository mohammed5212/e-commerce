import { axiosInstance } from "../axios/axiosInstance";

// Products
export const listProducts = () => {
  return axiosInstance.get("/products/listproducts");
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

// Auth

// Unified login for both admin & user
export const adminLogin = (formData) => {
  return axiosInstance.post("/admin/login", formData);
};


export const userLogin = (formData) => {
  return axiosInstance.post("/user/login", formData);
};

// Logout (backend clears cookie)
export const logout = () => axiosInstance.get("/auth/logout");

// Get currently logged-in user
export const getMe = () => axiosInstance.get("/auth/me");

// User registration
export const registerUser = (userData) =>
  axiosInstance.post("/user/register", userData);




// import  {axiosInstance}  from "../axios/axiosInstance";

// export const listProducts=() => {
//     return axiosInstance.get('/products/listproducts');
// };
// export const registerUser = (userData) => {
//     return axiosInstance.post('/user/register', userData);
// };

// export const loginUser = (credentials) => {
//     return axiosInstance.post('/user/login', credentials);
// }
// export const loginAdmin= (credentials) => {
//     return axiosInstance.post('/admin/login', credentials);
// }