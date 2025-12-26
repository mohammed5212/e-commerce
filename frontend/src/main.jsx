import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import {store} from "./redux/store.js";
import App from "./App.jsx";
import { ThemeProvider } from "@/components/theme-provider";



const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(

  <StrictMode>

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
         <App /> 
      </Provider>
      
     
     
    </ThemeProvider>

  </StrictMode>
);
