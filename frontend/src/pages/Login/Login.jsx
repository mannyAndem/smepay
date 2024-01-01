import { Link } from "react-router-dom";
import loginImg from "../../assets/signup-img.png";

import LoginForm from "../../features/authentication/LoginForm";

/**
 * Component is responsible for rendering login page
 *
 */

const Login = () => {
  return (
    <div className="min-h-screen flex">
      <div className="hidden min-h-screen w-full lg:block">
        <img src={loginImg} className="w-full h-full object-cover" />
      </div>
      <div className="h-full w-full px-5 py-8 lg:px-24">
        <Link to="/" className="block text-xl font-semibold text-right">
          SMEPAY
        </Link>
        <div className="mt-8">
          <h1 className="font-bold text-3xl text-dark">Login</h1>
          <span className="block mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </span>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
