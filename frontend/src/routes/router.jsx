import {createBrowserRouter} from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router";
import  Homepage  from '../pages/user/Homepage.jsx';
import Userlayout from '../layout/Userlayout.jsx';
import AboutPage from '@/pages/user/AboutPage.jsx';
import Products from '@/pages/user/Products.jsx';
import CategoryPage from '@/pages/user/CategoryPage.jsx';

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
  
  ]},
  
]);

