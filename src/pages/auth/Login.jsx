import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { Lock, User, Eye, EyeOff } from "lucide-react";

import wcdLogo from "../../assets/wcd-logo.jpg";
import indianLogo from "../../assets/indian-logo.jpg";
import mhGovtLogo from "../../assets/mh-govt-logo.jpg";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const from = "/";

  // ✅ Check login from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate(from, { replace: true });
    }
  }, [navigate]);

  const onSubmit = (data) => {
    if (data.username === "admin" && data.password === "admin123") {
      const user = {
        id: 1,
        name: "Admin",
        email: "admin@hrms.com",
        role: "admin",
      };

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/"); // dashboard
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="relative isolate min-h-screen overflow-y-auto bg-[#f7f8fa] text-slate-900">
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-6 sm:py-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col items-center gap-3 sm:gap-4 text-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
              <img
                src={indianLogo}
                alt="India Emblem"
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
              />
            </div>
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
              <img
                src={mhGovtLogo}
                alt="Maharashtra Govt"
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
              />
            </div>
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
              <img
                src={wcdLogo}
                alt="WCD Logo"
                className="h-9 w-9 sm:h-11 sm:w-11 object-contain"
              />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-slate-600">
              Government of Maharashtra
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              WCD Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Mission Shakti • Women & Child Development Department
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="relative w-full max-w-md overflow-hidden border border-slate-200 bg-white shadow-2xl">
          <div className="relative p-5 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white">
                <Lock className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">Sign in</h2>
                <p className="text-sm text-slate-600">
                  Use your admin credentials to continue
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Username"
                icon={<User className="h-4 w-4" />}
                placeholder="Enter your username"
                error={errors.username?.message}
                {...register("username")}
              />

              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                icon={<Lock className="h-4 w-4" />}
                endIcon={showPassword ? <EyeOff /> : <Eye />}
                onEndIconClick={() => setShowPassword(!showPassword)}
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password")}
              />

              <Button type="submit" className="w-full h-11">
                Sign In
              </Button>
            </form>

            <p className="text-center text-xs text-slate-500">
              &copy; {new Date().getFullYear()} WCD Admin Panel.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
