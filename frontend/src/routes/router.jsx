import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layout/PublicLayout";
import UserLayout from "@/layout/UserLayout";
import AdminLayout from "@/layout/AdminLayout";

import Home from "../pages/public/Homepage";
import Products from "@/pages/public/Products";
import AboutPage from "../pages/public/AboutPage";
import Register from "../pages/public/Register";

import UserLogin from "../pages/user/UserLogin";
import UserDashboard from "../pages/user/UserDashbord";
import Cart from "../pages/user/cartPage";

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashbord";
import CategoryManagement from "../pages/admin/CategoryManagement";

import AdminProtectedRoute from "./AdminProtectedRoute";
import UserProtectedRoute from "./UserProtuctedRoute";
import ErrorPage from "../pages/public/ErrorPage";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <ErrorPage />,},

  {
    element: <PublicLayout />,
    children: [
      { path: "/products", element: <Products /> },
      { path: "/about", element: <AboutPage /> },
    ],
  },

  { path: "/user/login", element: <UserLogin /> },
  { path: "/user/register", element: <Register /> },

  {
    path: "/user",
    element: <UserProtectedRoute />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { index: true, element: <UserDashboard /> },
          { path: "cart", element: <Cart /> },
        ],
      },
    ],
  },

  { path: "/admin/login", element: <AdminLogin /> },

  {
    path: "/admin",
    element: <AdminProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "category", element: <CategoryManagement /> },
        ],
      },
    ],
  },
]);

export default router;
