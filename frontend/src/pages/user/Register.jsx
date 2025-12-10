import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="
      min-h-screen flex items-center justify-center 
      bg-white dark:bg-gray-900 
      p-4 transition-all
    ">
      <div className="
        w-full max-w-md 
        bg-gray-100 dark:bg-gray-700 
        rounded-2xl shadow-lg p-8 
        transition-all
      ">
        
        <h2 className="text-3xl font-bold text-center 
                      text-cyan-700 dark:text-cyan-400 mb-6">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Username */}
          <div>
            <label className="block font-medium mb-1 
                              text-cyan-700 dark:text-cyan-400">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              onChange={handleChange}
              className="
                w-full p-3 border rounded-lg outline-none 
                bg-white dark:bg-gray-600 
                border-gray-300 dark:border-gray-500
                text-gray-900 dark:text-gray-100
                focus:ring-2 focus:ring-blue-500
              "
              placeholder="Enter username"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1 
                              text-cyan-700 dark:text-cyan-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="
                w-full p-3 border rounded-lg outline-none 
                bg-white dark:bg-gray-600 
                border-gray-300 dark:border-gray-500
                text-gray-900 dark:text-gray-100
                focus:ring-2 focus:ring-blue-500
              "
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1 
                              text-cyan-700 dark:text-cyan-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="
                w-full p-3 border rounded-lg outline-none 
                bg-white dark:bg-gray-600 
                border-gray-300 dark:border-gray-500
                text-gray-900 dark:text-gray-100
                focus:ring-2 focus:ring-blue-500
              "
              placeholder="Enter password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium mb-1 
                              text-cyan-700 dark:text-cyan-400">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              onChange={handleChange}
              className="
                w-full p-3 border rounded-lg outline-none 
                bg-white dark:bg-gray-600 
                border-gray-300 dark:border-gray-500
                text-gray-900 dark:text-gray-100
                focus:ring-2 focus:ring-blue-500
              "
              placeholder="Re-enter password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full bg-blue-600 hover:bg-blue-700 
              text-white font-semibold py-3 rounded-lg 
              mt-4 transition
            "
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 
                      text-amber-700 dark:text-amber-200">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
