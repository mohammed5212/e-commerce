import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { Provider } from "react-redux";
import  store  from './app/store';
import './index.css' 
const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </AuthProvider>
  )

}

export default App