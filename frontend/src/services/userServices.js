

import  {axiosInstance}  from "../axios/axiosInstance";

export const listProducts=() => {
    return axiosInstance.get('/products/listproducts');
};
export const registerUser = (userData) => {
    return axiosInstance.post('/user/register', userData);
};

export const loginUser = (credentials) => {
    return axiosInstance.post('/user/login', credentials);
}
export const loginAdmin= (credentials) => {
    return axiosInstance.post('/admin/login', credentials);
}