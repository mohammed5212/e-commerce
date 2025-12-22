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

    // Try admin login first
    await loginAdmin({
      email: form.email,
      password: form.password,
    });

    // If success → backend set cookie
    navigate("/admin/admindashboard");

  } catch (adminErr) {
    try {
      // If admin fails → try user
      await loginUser({
        email: form.email,
        password: form.password,
      });

      navigate("/user/userdashboard");

    } catch (userErr) {
      setError("Invalid email or password");
    }
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
                placeholder="....@gmail.com"
                value={form.email}
                onChange={handleChange}
                required
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
                required
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
              onClick={() => navigate("/register")} 
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

export default LoginPage;