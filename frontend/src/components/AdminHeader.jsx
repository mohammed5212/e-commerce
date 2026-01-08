import { NavLink, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../services/adminServices";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      navigate("/admin/login", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow flex items-center justify-between">
      
      {/* LEFT: Title + Navigation */}
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-semibold">Admin Panel</h1>

        <nav className="flex gap-6">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-400"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-400"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/category"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-400"
            }
          >
            Categories
          </NavLink>
        </nav>
      </div>

      {/* RIGHT: Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
