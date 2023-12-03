import { Link, useNavigate, useNavigationType } from "react-router-dom";
import signupImg from "../../assets/signup-img.png";
import googleIcon from "../../assets/google.svg";
import facebookIcon from "../../assets/logos_facebook.svg";
import { useEffect, useRef, useState } from "react";
import {
  login,
  resetLoginStatus,
  selectCurrentUser,
  selectLoginStatus,
} from "../../features/authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

/**
 * Component is responsible for rendering sign up page
 *
 */

// api: curl --location 'http://localhost:443/smepay/signup' \
// --data-raw '{
//   "fullname": "new user",
//   "email": "testuser@gmail.com",
//   "password": "testuserpassword",
//   "confirmpass": "testuserpassword"
// }'
const Login = () => {
  const status = useSelector(selectLoginStatus);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //   state to hold form errors
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    setFormErrors({});
    let validateCounter = 0;
    if (formData.email.length == 0) {
      setFormErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      validateCounter++;
    }
    if (formData.password.length == 0) {
      setFormErrors((prev) => ({
        ...prev,
        password: "This field is required",
      }));
      validateCounter++;
    }

    return validateCounter === 0;
  };

  const privacyCheckboxRef = useRef();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(login(formData));
  };

  useEffect(() => {
    if (status === "success") {
      toast.success("Login successful");
      console.log(currentUser);
      navigate("/dashboard");
    }
    if (status === "error") {
      toast.error("Failed to login");
      dispatch(resetLoginStatus());
    }
  }, [status]);

  return (
    <div className="min-h-screen flex">
      <Toaster />
      <div className="min-h-screen w-full">
        <img src={signupImg} className="w-full h-full object-cover" />
      </div>
      <div className="h-full w-full px-24 py-8">
        <span className="block text-xl font-semibold text-right">SMEPAY</span>
        <div className="mt-8">
          <h1 className="font-bold text-3xl text-dark">Login</h1>
          <span className="block mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </span>
          <form
            className="flex flex-col gap-8 mt-8"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold">
                Email address
              </label>

              <input
                type="text"
                autoComplete="off"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="text-sm w-full bg-white border border-lightGray p-3 rounded-3xl focus:outline-blue"
              />
              {formErrors?.email && (
                <span className="text-xs text-red">{formErrors.email}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-xs font-bold">
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                className="text-sm w-full bg-white border border-lightGray p-3 rounded-3xl focus:outline-blue"
              />
              {formErrors?.password && (
                <span className="text-xs text-red">{formErrors.password}</span>
              )}
            </div>
            {status === "pending" && (
              <button
                type="submit"
                disabled
                className="opacity-30 rounded-3xl p-3 bg-blue text-gray text-xl font-bold"
              >
                Sign in
              </button>
            )}
            {status !== "pending" && (
              <button
                type="submit"
                className="rounded-3xl p-3 bg-blue text-gray text-xl font-bold"
              >
                Sign in
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
