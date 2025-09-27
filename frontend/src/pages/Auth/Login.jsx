import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../../components/forms/InputField"; //  Import the component

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-10 left-20 w-20 h-20 bg-blue-400 rounded-full mix-blend-overlay blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-28 h-28 bg-indigo-400 rounded-full mix-blend-overlay blur-2xl opacity-30 animate-bounce"></div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-8 text-white">
        {/* Heading */}
        <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>
        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email using InputField */}
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="username@gmail.com"
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Password using InputField */}
          <InputField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <Link to="/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        {/* Register Link */}
        <p className="text-center text-sm text-white/80 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-300 hover:underline">
            Register for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;