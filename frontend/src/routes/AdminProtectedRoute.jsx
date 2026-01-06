import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminAxios } from "@/axios/adminAxios";

const AdminProtectedRoute = () => {
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        await adminAxios.get("/admin/me"); // cookie-based check
        setIsAdmin(true);
      } catch {
        setIsAdmin(false);
      } finally {
        setChecking(false);
      }
    };

    verifyAdmin();
  }, []);

  if (checking) {
    return <p className="text-center p-6">Checking admin session...</p>;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
