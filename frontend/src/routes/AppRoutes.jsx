import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
// import ProductList from "../pages/Products/ProductList";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/Home/Home";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path ="/"element =
       {
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }/>
        
        

      </Routes>
    </Router>
  );
};

export default AppRoutes;
