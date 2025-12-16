import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loginUser, loginAdmin } from "../../services/userServices";

const LoginPage = () => {
  const navigate = useNavigate();

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

      //  ADMIN LOGIN FIRST
      try {
        const adminRes = await loginAdmin(form);

        if (adminRes.data.user.role === "admin") {
          return navigate("/admin/admindashboard");
        }
      } catch (adminErr) {
        
      }

      //  USER LOGIN
      const userRes = await loginUser(form);

      if (userRes.data.user.role === "user") {
        return navigate("/user/userdashboard");
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-[380px] bg-gray-100 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl">Log In</CardTitle>
          <CardDescription>
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
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

          <div className="text-sm text-center mb-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-sky-500 hover:underline">
              Register
            </a>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;