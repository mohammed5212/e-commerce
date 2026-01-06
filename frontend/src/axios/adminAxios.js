import axios from "axios";

const adminAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // sends cookies automatically
});

export { adminAxios };