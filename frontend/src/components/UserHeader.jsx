import { useNavigate } from "react-router-dom";

const UserHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Optional: call backend logout API
    // await axiosInstance.post("/auth/logout");

    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-4">
      <h1 className="text-xl font-semibold text-gray-800">
        User Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
};

export default UserHeader;
