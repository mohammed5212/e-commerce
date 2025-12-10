import {createBrowserRouter} from 'react-router-dom';
import  Homepage  from '../pages/user/Homepage.jsx';
import Userlayout from '../layout/Userlayout.jsx';
import AboutPage from '@/pages/user/AboutPage.jsx';
import Products from '@/pages/user/Products.jsx';
import CategoryPage from '@/pages/user/CategoryPage.jsx';
import LoginPage from "../pages/shared/LoginPage.jsx";
import Register from '../pages/user/Register.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Userlayout />,
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
  
  ]},
  
]);

