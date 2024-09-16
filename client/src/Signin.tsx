import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// Validation schema for signin inputs
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Replace 'YOUR_API_URL' with the actual API URL from your environment variables
      const response = await axios.post(`https://hib4me-server.vercel.app/auth/signin`, data);
      navigate("/add"); // Redirect to the dashboard or any protected route
    } catch (error) {
      // Handle errors, such as invalid credentials
      alert(error.response?.data?.message || "An error occurred while signing in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/images/causes.png')` }}
    >
      <div className="mt-5 ml-5">
        <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white">Ib4me</h1>
      </div>
      <main className="w-full flex flex-1 flex-col lg:flex-row justify-center mx-auto">
        <div className="relative flex-1 lg:flex items-center justify-center leading-7">
          <div className="relative z-10 w-full max-w-md">
            <div className="space-y-3 px-4 lg:px-0">
              <h3 className="text-white text-xl sm:text-2xl md:text-5xl lg:text-7xl ">
                To create a campaign you need to Sign in
              </h3>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-4 lg:p-0">
          <div className="w-full max-w-md space-y-8 p-6 lg:p-8 bg-[#9E664366] bg-opacity-70 text-white rounded-xl shadow-lg">
            <div className="space-y-2 text-center">
              <div className="flex flex-col lg:flex-row lg:justify-between items-center">
                <h3 className="text-xl font-semibold text-black">
                  Welcome to <span className="text-white">Ib4Me</span>
                </h3>
                <p className="text-center text-[#8D8D8D] text-sm mt-2 lg:mt-0">
                  No Account?{" "}
                  <Link to="/signup" className="text-white hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
              <p className="text-5xl py-5 flex font-semibold text-start">Sign in</p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <button className="flex text-xs items-center justify-center gap-2 py-2 px-2 bg-white text-[#4285F4] rounded-lg shadow hover:bg-gray-100">
                  <img src="./images/google.png" className="w-5 h-5" alt="Google" />
                  Sign in with Google
                </button>
                <button
                  className="flex items-center justify-center py-2 px-2 bg-white rounded-lg shadow"
                  title="Sign in with Facebook"
                >
                  <img src="./images/facebook.png" className="w-5 h-5" alt="Facebook" />
                </button>
                <button
                  className="flex items-center justify-center py-2 px-2 bg-white rounded-lg shadow"
                  title="Sign in with GitHub"
                >
                  <img src="./images/apple.png" className="w-5 h-5" alt="Apple" />
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="font-medium">Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  {...register("username")}
                  className="w-full mt-2 px-3 py-2 text-gray-200 bg-transparent rounded-lg border shadow-sm"
                />
                <p className="text-red-500 text-xs mt-1">{errors.username?.message}</p>
              </div>
              <div>
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  {...register("password")}
                  className="w-full mt-2 px-3 py-2 text-gray-200 bg-transparent rounded-lg border shadow-sm"
                />
                <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
              </div>
              <div className="flex py-5 justify-end">
                <Link to="#" className="text-xs text-[#04B1D3] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-20 py-2 text-white font-medium bg-[#9E6643] hover:bg-[#9E6643] rounded-lg shadow-md"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signin;
