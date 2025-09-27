import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import InputField from "../../components/forms/InputField";
import Button from "../../components/common/Button";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "",  confirmPassword: ""});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    //check f passwords match
    if (form.password !== form.confirmPassword){
      setError("password donot match")
      return
    }
    try {
      await registerUser(form);
      navigate("/login"); // redirect to login after register
    } catch (err) {
      setError("Registration failed, try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <InputField
            label="Password"
            type="text"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
           <InputField
    label="Confirm Password"
    name="confirmPassword"
    value={form.confirmPassword}
    onChange={handleChange}
    placeholder="Confirm your password"
    required
    type="text"
      />
          <Button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg">
            Register
          </Button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
