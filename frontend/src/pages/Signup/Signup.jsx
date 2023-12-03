import { Link, useNavigate } from "react-router-dom";
import signupImg from "../../assets/signup-img.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSignupStatus,
  selectSignupStatus,
  signup,
} from "../../features/authentication/authSlice";
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
const Signup = () => {
  const status = useSelector(selectSignupStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "successs") {
      navigate("/");
    }
  }, [status]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //   state to hold form errors
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    setFormErrors({});
    let validateCounter = 0;
    if (formData.firstName.length == 0) {
      setFormErrors((prev) => ({
        ...prev,
        firstName: "Field cannot be empty",
      }));
      validateCounter++;
    }
    if (formData.lastName.length == 0) {
      setFormErrors((prev) => ({ ...prev, lastName: "Field cannot be empty" }));
      validateCounter++;
    }
    if (formData.email.length == 0) {
      setFormErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      validateCounter++;
    }
    if (formData.password.length < 6) {
      setFormErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters long",
      }));
      validateCounter++;
    }
    if (formData.confirmPassword !== formData.password) {
      setFormErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords must match",
      }));
      validateCounter++;
    }

    return validateCounter === 0;
  };

  const privacyCheckboxRef = useRef();

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(
      signup({
        fullname: formData.firstName + " " + formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmpass: formData.confirmPassword,
      })
    );
  };

  // toast error message if sign up fails.
  useEffect(() => {
    if (status === "error") {
      toast.error("Failed to signup");
      dispatch(resetSignupStatus());
    }
    if (status === "success") {
      toast.success("Successfully signed up!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
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
          <h1 className="font-bold text-3xl text-dark">Create new account</h1>
          <span className="block mt-2">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign In
            </Link>
          </span>

          <form
            className="flex flex-col gap-8 mt-8"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold">Enter full name</label>
              <div className="flex gap-7 items-center ">
                <div className="w-full flex flex-col gap-2">
                  <input
                    type="text"
                    autoComplete="off"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="text-sm w-full bg-white border border-lightGray p-3 rounded-3xl focus:outline-blue"
                  />
                  {formErrors?.firstName && (
                    <span className="text-xs text-red">
                      {formErrors.firstName}
                    </span>
                  )}
                </div>
                <div className="w-full flex flex-col gap-2">
                  <input
                    type="text"
                    autoComplete="off"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    name="lastName"
                    className="text-sm w-full bg-white border border-lightGray p-3 rounded-3xl focus:outline-blue"
                  />
                  {formErrors?.lastName && (
                    <span className="text-xs text-red">
                      {formErrors.lastName}
                    </span>
                  )}
                </div>
              </div>
            </div>
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
              <span className="text-xs">Must be at least 6 characters.</span>
              {formErrors?.password && (
                <span className="text-xs text-red">{formErrors.password}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-xs font-bold">
                Confirm password
              </label>

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className="text-sm w-full bg-white border border-lightGray p-3 rounded-3xl focus:outline-blue"
              />
              {formErrors?.confirmPassword && (
                <span className="text-xs text-red">
                  {formErrors.confirmPassword}
                </span>
              )}
            </div>
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                name="terms"
                ref={privacyCheckboxRef}
                required
                className="mt-1"
              />
              <p>
                I’ve read and agree with the Terms of Service and our Privacy
                Policy.
              </p>
            </div>
            {status != "pending" && (
              <button
                type="submit"
                className="rounded-3xl p-3 bg-blue text-gray text-xl font-bold"
              >
                Sign up
              </button>
            )}
            {status == "pending" && (
              <button
                type="submit"
                disabled
                className="opacity-30 rounded-3xl p-3 bg-blue text-gray text-xl font-bold"
              >
                Sign up
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
