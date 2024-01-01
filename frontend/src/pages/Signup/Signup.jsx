import { Link } from "react-router-dom";
import signupImg from "../../assets/signup-img.png";
import SignupForm from "../../features/authentication/SignupForm";

/**
 * Component is responsible for rendering sign up page
 *
 */
const Signup = () => {
  return (
    <div className="min-h-screen flex">
      <div className=" hidden min-h-screen w-full lg:block">
        <img src={signupImg} className="w-full h-full object-cover" />
      </div>
      <div className="h-full w-full px-5 py-8 lg:px-24">
        <Link to="/" className="block text-xl font-semibold text-right">
          SMEPAY
        </Link>
        <div className="mt-8">
          <h1 className="font-bold text-3xl text-dark">Create new account</h1>
          <span className="block mt-2">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign In
            </Link>
          </span>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
