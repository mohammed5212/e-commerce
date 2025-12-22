// import { Routes, Route } from "react-router-dom";

// import PublicLayout from "./layouts/PublicLayout";
// import UserLayout from "./layouts/UserLayout";
// import AdminLayout from "./layouts/AdminLayout";

// import Home from "./pages/public/Home";
// import Products from "./pages/public/Products";
// import Login from "./pages/public/Login";
// import UserDashboard from "./pages/user/UserDashboard";
// import AdminDashboard from "./pages/admin/AdminDashboard";

// function App() {
//   return (
//     <Routes>

//       {/* PUBLIC */}
//       <Route element={<PublicLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/login" element={<Login />} />
//       </Route>

//       {/* USER */}
//       <Route path="/user" element={<UserLayout />}>
//         <Route path="userdashboard" element={<UserDashboard />} />
//       </Route>

//       {/* ADMIN */}
//       <Route path="/admin" element={<AdminLayout />}>
//         <Route path="admindashboard" element={<AdminDashboard />} />
//       </Route>

//     </Routes>
//   );
// }

// export default App;
import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layout/Publiclayout";
import AdminLayout from "../layout/Adminlayout.jsx";

import Userlayout from "../layout/Userlayout.jsx";
import  Homepage  from '../pages/public/Homepage.jsx';
import AboutPage from '@/pages/public/AboutPage.jsx';
import Products from '@/pages/public/Products.jsx';
import CategoryPage from '@/pages/public/CategoryPage.jsx';
import LoginPage from "../pages/public/LoginPage.jsx";
import Register from '../pages/public/Register.jsx';
import ProtectedRoute   from "../components/ProtectedRoute.jsx";
import AdminDashboard from "../pages/admin/AdminDashbord.jsx";
import UserDashboard from "../pages/user/UserDashbord.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <h1>Error Page</h1>,

    children:[
       {
      
      path: "/",
    element: <Homepage/>,
  },
    {

      path: "/about",
    element: <AboutPage/>,
  },
   {
      path: "/products",
    element: <Products/>,
  },
{
      path: "/category",
    element: <CategoryPage/>,
  },
  {
      path: "/login",
    element: <LoginPage/>,
  },
  {
      path: "/register",
    element: <Register/>,
  },


{
  path: "/unauthorized",
  element: <h1>Unauthorized Access</h1>,
    
}
  ]},
    {
    path: "/admin",
   
    element: <AdminLayout />,


    children: [
      {
        path: "admindashboard",
        element:
        <ProtectedRoute children={<AdminDashboard />} allowedRoles={['admin']} />,
      },
    ],
  },

  // USER
  {
    path: "/user",
    element: <Userlayout />,
    children: [
      {
        path: "userdashboard",
        element: <UserDashboard />,
      },
    ],
  },
  
]);

