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
import InputGroup from "../../ui/InputGroup";

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
        <InputGroup
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          error={formErrors?.email}
          label="Email"
          pill={true}
        />
        <InputGroup
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={handleInputChange}
          error={formErrors.password}
          label="Password"
          pill={true}
        />
        <Button pending={status === "pending"} pill={true}>
          Sign In
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
