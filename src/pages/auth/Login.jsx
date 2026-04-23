import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { Lock, User, Eye, EyeOff } from "lucide-react";

// ✅ IMPORTANT: ADD THIS IMPORT
import { loginUser } from "../../services/admin.service";

import wcdLogo from "../../assets/wcd-logo.jpg";
import indianLogo from "../../assets/indian-logo.jpg";
import mhGovtLogo from "../../assets/mh-govt-logo.jpg";

// ✅ Validation
const loginSchema = z.object({
  username: z.string().min(1, "Email is required"),
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

  // ✅ Redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  // ✅ API LOGIN
  const onSubmit = async (data) => {
    try {
      const res = await loginUser({
        email: data.username,   // 🔥 username → email
        password: data.password,
      });

      console.log("Login Response:", res);

      // ✅ Save token
      if (res?.accessToken) {
        localStorage.setItem("token", res.accessToken);
      }

      // ✅ Save user
      if (res?.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }

      // ✅ Redirect
      navigate("/");

    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);

      alert(
        error.response?.data?.message ||
        "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔵 HEADER */}
      <div className="bg-blue-900 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

          <div className="flex items-center gap-5">
            <img src={indianLogo} alt="India" className="h-16 w-16 object-contain" />
            <img src={mhGovtLogo} alt="MH Govt" className="h-16 w-16 object-contain" />
          </div>

          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold">
              Government of Maharashtra
            </h1>
            <p className="text-sm sm:text-base">
              Zilla Parishad HRMS & Transfer System
            </p>
          </div>

          <div>
            <img src={wcdLogo} alt="WCD" className="h-16 w-16 object-contain" />
          </div>

        </div>
      </div>

      {/* 🔳 LOGIN BOX */}
      <div className="flex items-center justify-center mt-20 px-4">
        <div className="w-full max-w-md bg-white border border-gray-300 shadow-lg rounded-md">

          <div className="bg-blue-700 text-white text-center py-3 rounded-t-md">
            <h2 className="text-lg font-semibold">User Login</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">

            <Input
              label="Email"
              icon={<User />}
              placeholder="Enter email"
              error={errors.username?.message}
              {...register("username")}
            />

            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              icon={<Lock />}
              endIcon={showPassword ? <EyeOff /> : <Eye />}
              onEndIconClick={() => setShowPassword(!showPassword)}
              placeholder="Enter password"
              error={errors.password?.message}
              {...register("password")}
            />

            <Button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-900"
            >
              Login
            </Button>

          </form>
        </div>
      </div>

      {/* 🔻 FOOTER */}
      <div className="mt-24 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Government of Maharashtra. All Rights Reserved.
      </div>

    </div>
  );
};

export default Login;