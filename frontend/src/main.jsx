import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { ThemeProvider } from "@/components/theme-provider"; 

import App from './App.jsx'


const rootElement = document.getElementById('root')
const root = createRoot(rootElement )
root.render(
  <StrictMode>
   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
)   