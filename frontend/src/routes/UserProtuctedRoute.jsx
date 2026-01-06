import { Navigate, Outlet } from "react-router-dom";

const UserProtectedRoute = () => {
  // user token only
  const userToken = localStorage.getItem("token");

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;
