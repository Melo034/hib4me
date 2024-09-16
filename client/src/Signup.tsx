import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// Validation schema for form inputs
const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long"),
  email: yup.string().required("Email is required").email("Email is not valid"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

const Signup = () => {
  const [loading, setLoading] = useState(false);
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
      const response = await axios.post(
        `http://localhost:3000/auth/signup`,
        data
      );
      // Handle successful signup
      alert("User registered successfully!");
    } catch (error) {
      // Handle errors, such as user already exists
      alert(
        error.response?.data?.message || "An error occurred while signing up."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/images/signup.jpg')` }}
    >
      <div className="absolute inset-0 bg-[#302117D1] bg-opacity-40"></div>
      <div className="relative z-10 mt-5 ml-5">
        <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-[#9E6643]">
          Ib4me
        </h1>
      </div>
      <main className="w-full flex flex-1 flex-col lg:flex-row justify-center mx-auto">
        <div className="relative flex-1 lg:flex items-center justify-center leading-7"></div>
        <div className="flex-1 flex items-center justify-center p-4 lg:p-0">
          <div className="w-full max-w-md space-y-8 p-6 lg:p-8 bg-[#5C3A26C2] opacity-90 text-white rounded-xl shadow-lg">
            <div className="space-y-2 text-center">
              <div className="flex flex-col lg:flex-row lg:justify-between items-center">
                <h3 className="text-xl font-semibold text-white">
                  Welcome to <span className="text-[#9E6643]">Ib4Me</span>
                </h3>
                <p className="text-center text-[#8D8D8D] text-sm mt-2 lg:mt-0">
                  Have an Account?{" "}
                  <Link to="/signin" className="text-[#04B1D3] hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
              <p className="text-5xl font-semibold py-5 flex text-start">
                Sign up
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <button className="flex text-xs items-center justify-center gap-2 py-2 px-2 bg-white text-[#4285F4] rounded-lg shadow hover:bg-gray-100">
                  <img
                    src="./images/google.png"
                    className="w-5 h-5"
                    alt="Google"
                  />
                  Sign up with Google
                </button>
                <button
                  className="flex items-center justify-center py-2 px-2 bg-white rounded-lg shadow"
                  title="Sign in with Facebook"
                >
                  <img
                    src="./images/facebook.png"
                    className="w-5 h-5"
                    alt="Facebook"
                  />
                </button>
                <button
                  className="flex items-center justify-center py-2 px-2 bg-white rounded-lg shadow"
                  title="Sign in with GitHub"
                >
                  <img
                    src="./images/apple.png"
                    className="w-5 h-5"
                    alt="Apple"
                  />
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.username?.message}
                </p>
              </div>
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="text"
                  placeholder="Enter email"
                  {...register("email")}
                  className="w-full mt-2 px-3 py-2 text-gray-200 bg-transparent rounded-lg border shadow-sm"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              </div>
              <div>
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  {...register("password")}
                  className="w-full mt-2 px-3 py-2 text-gray-200 bg-transparent rounded-lg border shadow-sm"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              </div>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    {...register("terms")}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ms-2 text-sm font-medium text-[#9E6643]"
                >
                  I have read and accepted the{" "}
                  <a href="#" className="text-[#04B1D3] hover:underline">
                    Terms and Conditions and Privacy Policy
                  </a>
                  .
                </label>
                <p className="text-red-500 text-xs mt-1">
                  {errors.terms?.message}
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-20 py-2 text-white font-medium bg-[#9E6643] hover:bg-[#9E6643] rounded-lg shadow-md"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
