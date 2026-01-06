import { adminAxios } from "../axios/adminAxios";

// AUTH
export const loginAdmin = (formData) =>
  adminAxios.post("/admin/login", formData);
export const logoutAdmin = () =>
  adminAxios.get("/admin/logout");
export const getAdminMe = () =>
  adminAxios.get("/admin/me");
// DASHBOARD / STATS (optional)
export const getAdminDashboard = () =>
  adminAxios.get("/admin/dashboard");
