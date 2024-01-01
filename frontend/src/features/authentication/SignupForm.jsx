import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetSignupStatus, selectSignupStatus, signup } from "./authSlice";
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
const SignupForm = () => {
  const status = useSelector(selectSignupStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [privacyChecked, setPrivacyChecked] = useState(false);

  //   state to hold form errors
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    setFormErrors({});
    const validFirstName = validateString(formData.firstName);
    const validLastName = validateString(formData.lastName);
    const validEmail = validateEmail(formData.email);
    const validPassword = validatePassword(formData.password);
    const validConfirmPassword = formData.password === formData.confirmPassword;

    // Check if privacy checkbox has been ticked
    if (!privacyChecked) {
      setFormErrors((prev) => ({
        ...prev,
        privacyChecked:
          "You must agree to the privacy policy and terms of service",
      }));
    }

    if (!validFirstName) {
      setFormErrors((prev) => ({
        ...prev,
        firstName: "Field cannot be empty",
      }));
    }
    if (!validLastName) {
      setFormErrors((prev) => ({ ...prev, lastName: "Field cannot be empty" }));
    }
    if (!validEmail) {
      setFormErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    }
    if (!validPassword) {
      setFormErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters long",
      }));
    }
    if (!validConfirmPassword) {
      setFormErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords must match",
      }));
    }

    return (
      privacyChecked &&
      validFirstName &&
      validLastName &&
      validEmail &&
      validPassword &&
      validConfirmPassword
    );
  };

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
    <>
      <Toaster />
      <form
        className="flex flex-col gap-8 mt-8"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col gap-2">
          <label className="hidden text-xs font-bold lg:block">
            Enter full name
          </label>
          <div className="flex flex-col gap-7 lg:items-center lg:flex-row">
            <InputGroup
              name="firstName"
              value={formData.firstName}
              placeholder="Enter first name"
              onChange={handleInputChange}
              error={formErrors.firstName}
            />
            <InputGroup
              name="lastName"
              value={formData.lastName}
              placeholder="Enter your last name"
              onChange={handleInputChange}
              error={formErrors.lastName}
            />
          </div>
        </div>
        <InputGroup
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={handleInputChange}
          error={formErrors.email}
          label="Email"
        />
        <InputGroup
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={handleInputChange}
          error={formErrors.password}
          label="Password"
        />
        <InputGroup
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm your password"
          onChange={handleInputChange}
          error={formErrors.confirmPassword}
          label="Confirm Password"
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-4">
            <input
              type="checkbox"
              name="terms"
              checked={privacyChecked}
              onChange={() => setPrivacyChecked((prev) => !prev)}
              className="mt-1"
            />
            <p>
              I’ve read and agree with the Terms of Service and our Privacy
              Policy.
            </p>
          </div>
          {formErrors?.privacyChecked && (
            <span className="text-xs text-red">
              {formErrors.privacyChecked}
            </span>
          )}
        </div>
        <Button pending={status === "pending"} pill={true}>
          Sign up
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
