import { userAxios } from "../axios/userAxios";

// AUTH
export const UserLogin = (formData) =>
  userAxios.post("/user/login", formData);

export const userRegister = (formData) =>
  userAxios.post("/user/register", formData);

export const userLogout = () =>
  userAxios.post("/user/logout");

// GET CURRENT USER
export const getCurrentUser = () =>
  userAxios.get("/user/me");

// (optional) USER DASHBOARD
export const getUserDashboard = () =>
  userAxios.get("/user/dashboard");
