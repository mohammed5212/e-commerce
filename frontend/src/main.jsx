// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css';
// import { ThemeProvider } from "@/components/theme-provider"; 

// import App from './App.jsx'


// const rootElement = document.getElementById('root')
// const root = createRoot(rootElement )
// root.render(
//   <StrictMode>
//    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <App />
//     </ThemeProvider>
//   </StrictMode>
// )   

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { ThemeProvider } from "@/components/theme-provider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <App />
        <ToastContainer position="top-right" autoClose={2000} />
      </>
    </ThemeProvider>
  </StrictMode>
);