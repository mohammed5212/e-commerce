import { NavLink } from "react-router-dom";

const UserSidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        MyShop
      </div>

      <nav className="p-4 space-y-2">
        <NavLink
          to="/user/userdashboard"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive
                ? "bg-slate-700"
                : "hover:bg-slate-800"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/user/orders"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive
                ? "bg-slate-700"
                : "hover:bg-slate-800"
            }`
          }
        >
          My Orders
        </NavLink>

        <NavLink
          to="/user/profile"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive
                ? "bg-slate-700"
                : "hover:bg-slate-800"
            }`
          }
        >
          Profile
        </NavLink>
      </nav>
    </aside>
  );
};

export default UserSidebar;
