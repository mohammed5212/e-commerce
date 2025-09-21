import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
// import ProductList from "../pages/Products/ProductList";
// import ProtectedRoute from "./ProtectedRoute";
// import CartPage from "../pages/Cart/CartPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        {/* <Route  path="/" element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"  element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        /> */}

      </Routes>
    </Router>
  );
};

export default AppRoutes;
