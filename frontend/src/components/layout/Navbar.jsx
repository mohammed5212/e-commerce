import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Menu, X } from "lucide-react"; // icons

const Navbar = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        E-Shop
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-600 font-medium transition">
          Home
        </Link>
        <Link to="/products" className="hover:text-blue-600 font-medium transition">
          Products
        </Link>

        {user ? (
          <>
            <Link to="/cart" className="hover:text-blue-600 font-medium transition">
              Cart
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-600 font-medium transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-600 font-medium transition">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-gray-700 focus:outline-none"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 md:hidden z-50">
          <Link
            to="/"
            className="hover:text-blue-600 font-medium transition"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-blue-600 font-medium transition"
            onClick={toggleMenu}
          >
            Products
          </Link>

          {user ? (
            <>
              <Link
                to="/cart"
                className="hover:text-blue-600 font-medium transition"
                onClick={toggleMenu}
              >
                Cart
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-600 font-medium transition"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-blue-600 font-medium transition"
                onClick={toggleMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;