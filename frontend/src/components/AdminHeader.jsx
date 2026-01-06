import { logoutAdmin } from "../services/adminServices";

const AdminHeader = () => {
  const handleLogout = async () => {
    await logoutAdmin();
    window.location.href = "/login";
  };

  return (
    <header className="bg-white p-4 shadow flex justify-between">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
