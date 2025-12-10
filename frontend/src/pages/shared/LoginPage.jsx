import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-[380px] bg-gray-100 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl">Log In</CardTitle>
          <CardDescription>
            Enter your email below to access your account.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full bg-sky-200 dark:bg-sky-700">
              Sign In
            </Button>
           
          </CardFooter>
           <div className="text-sm text-center mb-4"> 
              Don't have an account? <a href="/register" className="text-sky-500 hover:underline">Register</a>
            </div>
        </form>
        
      </Card>
    </div>
  );
};

export default LoginPage;