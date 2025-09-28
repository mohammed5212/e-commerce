import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../../components/forms/InputField";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      // Backend expects "username" instead of "name"
      await axios.post("http://localhost:3000/api/auth/register", {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });

      navigate("/login"); // redirect after successful register
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-600 to-emerald-700 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-12 left-20 w-20 h-20 bg-green-400 rounded-full mix-blend-overlay blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-16 right-24 w-28 h-28 bg-emerald-400 rounded-full mix-blend-overlay blur-2xl opacity-30 animate-bounce"></div>

      {/* Register Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-8 text-white">
        <h2 className="text-xl font-semibold mb-6 text-center">Register</h2>

        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="username@gmail.com"
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <InputField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <InputField
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm Password"
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-green-900 hover:bg-green-800 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-white/80 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;