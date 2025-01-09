import { useState } from "react";
import { Link, Navigate } from "react-router";
import LoginBackground from "../assets/images/login-background.png";
import { useAuth } from "../core/hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  if (auth.token) return <Navigate to="/" />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    auth.signIn?.(username, password);
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
              <Link to="/register" className="text-sm text-blue-500 hover:underline pl-2">
                Register now
              </Link>
            </p>
          </div>
          <h1 className="text-3xl font-semibold mb-4 text-gray-800 text-center">Hello Again!</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">Welcome back you have been missed!</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-5 text-left">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                User Name
              </label>
              <input
                type="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
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
              <Link to="/reset-password" className="text-sm text-blue-500 hover:underline">
                Forget Password?
              </Link>
              <button
                type="submit"
                className="w-full bg-red-400 text-white py-3 mt-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Sign In
              </button>
            </div>
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
