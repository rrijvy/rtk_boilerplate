import { useState } from "react";
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
        <img src={LoginBackground} alt="Login Background" className="w-full h-full object-cover opacity-90" />
      </div>

      <div className="flex-1 flex justify-center items-center bg-white p-6">
        <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-sm">
          <div className="absolute top-4 right-3">
            <p>
              Not a member?
              <a href="/register" className="text-sm text-blue-500 hover:underline pl-2">
                Register now
              </a>
            </p>
          </div>
          <h1 className="text-3xl font-semibold mb-4 text-gray-800 text-center">Hello Again!</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">Welcome back you have been missed!</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-5 text-left">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
              <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Recovery Password
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-red-400 text-white py-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign in
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
