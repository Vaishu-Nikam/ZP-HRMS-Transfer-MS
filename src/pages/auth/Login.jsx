// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useNavigate } from "react-router-dom";
// import { Input } from "../../components/common/Input";
// import { Button } from "../../components/common/Button";
// import { Lock, User, Eye, EyeOff } from "lucide-react";

// // ✅ IMPORTANT: ADD THIS IMPORT
// import { loginUser } from "../../services/admin.service";

// import indianLogo from "../../assets/indian-logo.jpg";
// import pune_zp from "../../assets/pune_zp.png";
// import maha_logo from "../../assets/maha_logo.png";
// // ✅ Validation
// const loginSchema = z.object({
//   username: z.string().min(1, "Email is required"),
//   password: z.string().min(1, "Password is required"),
// });

// const Login = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   // ✅ Redirect if already logged in
//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user) {
//       navigate("/");
//     }
//   }, [navigate]);

//   // ✅ API LOGIN
//   const onSubmit = async (data) => {
//     try {
//       const res = await loginUser({
//         email: data.username,   // 🔥 username → email
//         password: data.password,
//       });

//       console.log("Login Response:", res);

//       // ✅ Save token
//       if (res?.accessToken) {
//         localStorage.setItem("token", res.accessToken);
//       }

//       // ✅ Save user
//       if (res?.user) {
//         localStorage.setItem("user", JSON.stringify(res.user));
//       }

//       // ✅ Redirect
//       navigate("/");

//     } catch (error) {
//       console.error("Login Error:", error.response?.data || error.message);

//       alert(
//         error.response?.data?.message ||
//         "Invalid email or password"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">

//       {/* 🔵 HEADER */}
//       <div className="bg-blue-700 text-white text-center py-3 rounded-t-md">
//         <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

//           <div className="flex items-center gap-5">
//             <img src={indianLogo} alt="India" className="h-20 w-20 object-contain" />
//             <img src={pune_zp} alt="MH Govt" className="h-20 w-20 object-contain" />
//           </div>

//           <div className="text-center">
//             <h1 className="text-xl sm:text-2xl font-bold">
//              Zilla Parishad Pune
//             </h1>
//             <p className="text-sm sm:text-base">
//               Zilla Parishad HRMS System
//             </p>
//           </div>

//           <div>
//             <img src={maha_logo} alt="MH Govt" className="h-20 w-20 object-contain" />
//           </div>

//         </div>
//       </div>

//       {/* 🔳 LOGIN BOX */}
//       <div className="flex items-center justify-center mt-20 px-4">
//         <div className="w-full max-w-md bg-white border border-gray-300 shadow-lg rounded-md">

//           <div className="bg-blue-700 text-white text-center py-3 rounded-t-md">
//             <h2 className="text-lg font-semibold">User Login</h2>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">

//             <Input
//               label="Email"
//               icon={<User />}
//               placeholder="Enter email"
//               error={errors.username?.message}
//               {...register("username")}
//             />

//             <Input
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               icon={<Lock />}
//               endIcon={showPassword ? <EyeOff /> : <Eye />}
//               onEndIconClick={() => setShowPassword(!showPassword)}
//               placeholder="Enter password"
//               error={errors.password?.message}
//               {...register("password")}
//             />

//             <Button
//               type="submit"
//               className="w-full bg-blue-800 hover:bg-blue-900"
//             >
//               Login
//             </Button>

//           </form>
//         </div>
//       </div>

//       {/* 🔻 FOOTER */}
//       <div className="mt-24 text-center text-xs text-gray-500">
//         © {new Date().getFullYear()} Government of Maharashtra. All Rights Reserved.
//       </div>

//     </div>
//   );
// };

// export default Login;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import {
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react";

import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";

import { loginUser } from "../../services/admin.service";

// ✅ Logos
import indianLogo from "../../assets/indian-logo.jpg";
import pune_zp from "../../assets/pune_zp.png";
import maha_logo from "../../assets/maha_logo.png";

// ✅ Validation Schema
const loginSchema = z.object({
  username: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  

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

  // ✅ Login Submit
  const onSubmit = async (data) => {

    try {
      setLoading(true);

      const res = await loginUser({
        email: data.username,
        password: data.password,
      });

      console.log("Login Response:", res);

      // ✅ Save Token
      if (res?.accessToken) {

        localStorage.setItem(
          "token",
          res.accessToken
        );
      }

      // ✅ Save User
      if (res?.user) {

        localStorage.setItem(
          "user",
          JSON.stringify(res.user)
        );
      }

      const user = res?.user;

      console.log(user);

      // ✅ Employee First Login Only
      if (
        user?.roles === "employee" &&
        user?.is_verified === false
      ) {

        navigate("/change-password");

        return;
      }

      // ✅ Employee Profile Incomplete
      if (
        user?.roles === "employee" &&
        (
          user?.profile_completed === false ||
          !user?.profile_completed
        )
      ) {

        navigate(
          `/employees/edit/${user.user_id}`
        );

        return;
      }

      // ✅ Dashboard
      navigate("/");

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Invalid Email or Password"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col">

     
      <header className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg border-b-4 border-yellow-400">

        <div className="max-w-7xl mx-auto px-4 py-4">

          <div className="flex items-center justify-between">

            {/* Left Logos */}
            <div className="flex items-center gap-4">

              <div className="bg-white rounded-full p-2 shadow-md">
                <img
                  src={indianLogo}
                  alt="India Logo"
                  className="h-20 w-20 object-contain"
                />

              </div>

              <div className="bg-white rounded-full p-2 shadow-md">

                <img
                  src={pune_zp}
                  alt="Pune ZP"
                  className="h-20 w-20 object-contain"
                />
              </div>

            </div>

            {/* Center Text */}
            <div className="text-center text-white">

              <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
                Zilla Parishad Pune
              </h1>

              <p className="text-sm md:text-base mt-1 text-gray-200">
                Human Resource Management System (HRMS)
              </p>

              <p className="text-xs mt-1 text-blue-100">
                Government of Maharashtra
              </p>

            </div>

            {/* Right Logo */}
            <div className="bg-white rounded-full p-2 shadow-md">
              <img
                src={maha_logo}
                alt="Maharashtra Logo"
                className="h-20 w-20 object-contain"
              />
            </div>

          </div>

        </div>

      </header>


      <main className="flex-1 flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-md">

          {/* Login Card */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">

            {/* Card Header */}
            <div className="bg-blue-800 text-white py-4 px-6 text-center">

              <h2 className="text-2xl font-semibold">
                User Login
              </h2>

              <p className="text-sm text-blue-100 mt-1">
                Authorized Personnel Only
              </p>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-6 space-y-5"
            >

              {/* Email */}
              <Input
                label="Email Address"
                icon={<User size={18} />}
                placeholder="Enter your email"
                error={errors.username?.message}
                {...register("username")}
              />

              {/* Password */}
              <Input
                label="Password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                icon={<Lock size={18} />}
                endIcon={
                  showPassword
                    ? <EyeOff size={18} />
                    : <Eye size={18} />
                }
                onEndIconClick={() =>
                  setShowPassword(!showPassword)
                }
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password")}
              />

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 text-base font-semibold rounded-md transition-all duration-300"
              >

                {
                  loading
                    ? "Please Wait..."
                    : "Login"
                }

              </Button>

            </form>

          </div>

          {/* Note */}
          <div className="mt-5 text-center text-sm text-gray-600">

            This is an official portal of
            Zilla Parishad Pune.

          </div>

        </div>

      </main>


      <footer className="bg-white border-t border-gray-300 py-4">

        <div className="text-center text-sm text-gray-600">

          © {new Date().getFullYear()}
          {" "}
          Zilla Parishad Pune |
          All Rights Reserved

        </div>

      </footer>

    </div>
  );
};

export default Login;