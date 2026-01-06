import { createBrowserRouter } from "react-router-dom";
import AdminProtectedRoute from "./AdminProtectedRoute";


import PublicLayout from "../layout/PublicLayout";
import Home from "../pages/public/Homepage";
import Products from "@/pages/public/Products";
import AboutPage from "../pages/public/AboutPage"
import Category from "../pages/public/CategoryPage"

import AdminLayout from "@/layout/AdminLayout";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashbord";

import UserLayout from "@/layout/UserLayout";
import UserLogin from "../pages/user/UserLogin";
import Register from "../pages/public/Register"
import UserDashboard from "../pages/user/UserDashbord";
import Cart from "../pages/user/cartPage";
import UserProtectedRoute from "./UserProtuctedRoute";
// import Checkout from "@/pages/user/Checkout";

const router = createBrowserRouter([

      { path: "/", element: <Home /> },
      
      {
        element: <PublicLayout />,
        children: [
           { path: "/products", element: <Products /> },
            { path:"/about",element:<AboutPage/>},
            { path:"/category",element:<Category/>},
        ]
      },

       {
    path: "/user/login",
    element: <UserLogin />,
  },
    {path :"/user/register", element :<Register/>},
       {
    path: "/user",
    element: <UserProtectedRoute />,
    children: [
      {
        element: <UserLayout />,
        children: [
            
          { index: true, element: <UserDashboard /> },
          { path: "cart", element: <Cart /> },
        //   { path: "checkout", element: <Checkout /> },
        ],
      },
    ],
  },

  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
            { path: "dashboard", element: <AdminDashboard /> },
        ],
      },
    ],
  },
]);

export default router;
