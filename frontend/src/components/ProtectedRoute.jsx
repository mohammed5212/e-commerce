import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getMe } from "../services/userServices";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    getMe()
      .then(res => {
        if (!allowedRoles || allowedRoles.includes(res.data.role)) {
          setAuthorized(true);
        }
      })
      .catch(() => setAuthorized(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Checking authentication...</p>;

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;