import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar"; 
import { AuthContext } from "../../context/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        {user ? (
          <>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome , {user?.username  || "Shopper"} 👋
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Explore our latest products and exclusive deals
            </p>
            <Link
              to="/products"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Our Store
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Sign in to enjoy personalized shopping
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/login"
                className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-100 text-blue-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-200 transition"
              >
                Register
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;