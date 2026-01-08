import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { UserLogin as loginService, getCurrentUser } from "../../services/userServices";
import { loginSuccess } from "../../redux/slices/authSlice";

const userLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      // Login request
      await loginService(form); // backend sets 'userToken' cookie automatically

      // Fetch current user using cookie
      const res = await getCurrentUser(); 
      const user = res.data.user;

      if (user.role !== "user") {
        throw new Error("Not authorized as user");
      }

      // Store in Redux (optional, no need for localStorage token)
      dispatch(loginSuccess(user));
      localStorage.setItem("user", JSON.stringify(user)); // optional, just for UI state

      // Redirect
      navigate("/products");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-[380px] bg-gray-100 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl">User Login</CardTitle>
          <CardDescription>Login to continue shopping</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </CardFooter>

          <div className="text-sm text-center mb-4 text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/user/register")}
              className="text-sky-500 hover:underline bg-transparent border-none cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default userLogin;
