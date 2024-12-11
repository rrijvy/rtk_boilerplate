import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod"; 
import LoginBackground from "../assets/images/login-background.png";

const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .regex(emailRegex, "Please enter a valid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters")
    .nonempty("Password is required"),
});

type FormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData: FormData = loginSchema.parse({ email, password });

      console.log("Login details:", validatedData);

      setErrors({});
    } catch (error) {
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
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 relative h-screen">
        <img
          src={LoginBackground}
          alt="Login Background"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      <div className="flex-1 flex justify-center items-center bg-white p-6">
        <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-sm">
          <div className="absolute top-4 right-3">
            <p>
              Not a member?
              <a
                href="/register"
                className="text-sm text-blue-500 hover:underline pl-2"
              >
                Register now
              </a>
            </p>
          </div>
          <h1 className="text-3xl font-semibold mb-4 text-gray-800 text-center">
            Hello Again!
          </h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Welcome back you have been missed!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-5 text-left">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="mb-6 text-left">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="mb-6 text-right">
              <Link to="reset-password" className="text-sm text-blue-500 hover:underline">
                Forget Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              Login
            </button>
          </form>
          <div className="relative flex items-center my-10">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="mt-6 flex justify-center">
            <i className="fa-brands fa-google cursor-pointer text-3xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></i>
            <i className="fa-brands fa-twitter cursor-pointer text-3xl text-sky-500 pl-5"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
