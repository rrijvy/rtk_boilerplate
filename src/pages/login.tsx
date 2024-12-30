import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import axiosInstance from "../api/axiosInstance";
import LoginBackground from "../assets/images/login.png";
import { SvgApple, SvgGoogle } from "../assets/svg";

const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .regex(emailRegex, "Please enter a valid email address")
    .nonempty("Email is required"),
  password: z.string().min(6, "Password should be at least 6 characters").nonempty("Password is required"),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = loginSchema.parse({ email, password });
      console.log("Login details:", validatedData);

      setErrors({});

      const response = await axiosInstance.post("/user/login", validatedData);
      console.log("Login successful:", response.data);
      alert("Login successful!");
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const errorMessages: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === "email") {
            errorMessages.email = err.message;
          } else if (err.path[0] === "password") {
            errorMessages.password = err.message;
          }
        });
        setErrors(errorMessages);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full h-[50vh] bg-cover">
        <img src={LoginBackground} alt="Login Background" className="w-full h-full object-fill object-center opacity-90" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mt-[-45px]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-900 mb-9">Log In to Sultan</h1>
          </div>
          <div className="space-y-6 mt-4">
            <button className="w-full py-3 bg-white border border-blue-500 text-blue-400 font-medium rounded-lg flex items-center justify-center hover:bg-gray-200 gap-x-3">
              <SvgGoogle /> Continue with Google
            </button>
            <button className="w-full py-3 bg-white border border-blue-500 text-blue-400 font-medium rounded-lg flex items-center justify-center hover:bg-gray-200 gap-x-3">
              <SvgApple /> Continue with Apple
            </button>
          </div>
          {/*
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-white font-medium rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Log In
          </button> 
        </form> */}
          <div className="text-center my-6 text-sm text-black-500">Or</div>
          <div className="text-center">
            <Link
              to="/register"
              className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg flex items-center justify-center hover:bg-blue-600"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
