import LoginBackground from "../assets/images/login.png";
import { Link } from "react-router-dom";
import { SvgApple, SvgGoogle } from "../assets/svg";

const Login = () => {
  return (
    <div className="login-page min-h-screen flex flex-col">
      <div className="hero-image w-full bg-cover shadow-inner">
        <img src={LoginBackground} alt="Login Background" className="w-full h-full object-fill opacity-90" />
      </div>
      <div className="login-body flex-1 flex flex-col items-center">
        <div className="w-full max-w-md mt-[100px]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-900 mb-9">Log In to Sultan</h1>
          </div>
          <div className="space-y-6 mt-4">
            <button className="w-full py-3 border border-blue-500 text-blue-400 font-medium rounded-lg flex items-center justify-center hover:bg-gray-200 gap-x-3">
              <SvgGoogle /> Continue with Google
            </button>
            <button className="w-full py-3 border border-blue-500 text-blue-400 font-medium rounded-lg flex items-center justify-center hover:bg-gray-200 gap-x-3">
              <SvgApple /> Continue with Apple
            </button>
          </div>
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
