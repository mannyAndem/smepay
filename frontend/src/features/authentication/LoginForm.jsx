import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login, resetLoginStatus, selectLoginStatus } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  validateEmail,
  validatePassword,
  validateString,
} from "../../utils/validateFuncs";
import Button from "../../ui/Button";

/**
 * Component is responsible for rendering sign up page
 *
 */

const LoginForm = () => {
  const status = useSelector(selectLoginStatus);
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
    const validEmail = validateEmail(formData.email);
    const validPassword = validateString(formData.password);

    if (!validEmail) {
      setFormErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    }
    if (formData.password.length == 0) {
      setFormErrors((prev) => ({
        ...prev,
        password: "This field is required",
      }));
    }

    return validEmail && validPassword;
  };

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
      navigate("/dashboard");
    }
    if (status === "error") {
      toast.error("Failed to login");
      dispatch(resetLoginStatus());
    }
  }, [status]);

  return (
    <>
      <Toaster />
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
        <Button pending={status === "pending"} pill={true}>
          Sign In
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
