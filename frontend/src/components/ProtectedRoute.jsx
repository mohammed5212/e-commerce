// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { getMe } from "../services/userServices";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const [loading, setLoading] = useState(true);
//   const [authorized, setAuthorized] = useState(false);

//   useEffect(() => {
//     getMe()
//       .then(res => {
//         if (!allowedRoles || allowedRoles.includes(res.data.role)) {
//           setAuthorized(true);
//         }
//       })
//       .catch(() => setAuthorized(false))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <p>Checking authentication...</p>;

//   if (!authorized) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    console.log(user)
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
