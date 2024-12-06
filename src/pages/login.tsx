import { useState } from "react";
import { Link } from "react-router-dom"; 
import LoginBackground from "../assets/images/login-background.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login details:", { email, password });
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
            Welcome back, you've been missed!
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
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
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
                required
                className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-6 text-right">
              <Link
                to="/forgot-password" 
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
