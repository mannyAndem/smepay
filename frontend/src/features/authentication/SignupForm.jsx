import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Formik } from "formik";
import Button from "../../ui/Button";
import InputGroup from "../../ui/InputGroup";
import { useSignupMutation } from "../api/apiSlice";
import * as yup from "yup";
import Input from "../../ui/Input";

const SignupForm = () => {
  const navigate = useNavigate();

  const [signup, { isSuccess, isLoading, data, isError, error }] =
    useSignupMutation();

  const handleSubmit = ({
    firstName,
    lastName,
    email,
    password,
    confirmpass,
  }) => {
    const data = {
      fullname: `${firstName} ${lastName}`,
      email,
      password,
      confirmpass,
    };

    signup(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account created successfully, kindly login!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
    if (isError) {
      toast.error("Failed to create user");
      console.error(error);
    }
  }, [isSuccess, isError, data, error, navigate]);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpass: "",
    privacyChecked: false,
  };

  const formSchema = new yup.ObjectSchema({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(9, "Password must be atleast 9 characters long"),
    confirmpass: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    privacyChecked: yup
      .boolean()
      .isTrue("You must agree to the term and privacy policy"),
  });

  return (
    <>
      <Toaster />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={formSchema}
      >
        {({
          values,
          touched,
          dirty,
          isValid,
          handleSubmit,
          handleChange,
          errors,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-8">
            <div className="flex flex-col gap-2">
              <label className="hidden text-xs font-bold lg:block">
                Enter full name
              </label>
              <div className="flex flex-col gap-7 lg:items-center lg:flex-row">
                <InputGroup
                  name="firstName"
                  isInvalid={touched.firstName && !!errors.firstName}
                  value={values.firstName}
                  placeholder="Enter first name"
                  onChange={handleChange}
                  error={errors.firstName}
                  pill={true}
                />
                <InputGroup
                  name="lastName"
                  isInvalid={touched.lastName && !!errors.lastName}
                  value={values.lastName}
                  placeholder="Enter last name"
                  onChange={handleChange}
                  error={errors.lastName}
                  pill={true}
                />
              </div>
            </div>
            <InputGroup
              name="email"
              isInvalid={touched.email && !!errors.email}
              value={values.email}
              placeholder="Enter your email"
              onChange={handleChange}
              error={errors.email}
              label="Email"
              pill={true}
            />
            <InputGroup
              name="password"
              type="password"
              isInvalid={touched.password && !!errors.password}
              value={values.password}
              placeholder="Enter your password"
              onChange={handleChange}
              error={errors.password}
              label="Password"
              pill={true}
            />
            <InputGroup
              name="confirmpass"
              type="password"
              isInvalid={touched.confirmpass && !!errors.confirmpass}
              value={values.confirmpass}
              placeholder="Confirm your password"
              onChange={handleChange}
              error={errors.confirmpass}
              label="Confirm password"
              pill={true}
            />
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-4">
                <Input
                  id="privacyChecked"
                  type="checkbox"
                  name="privacyChecked"
                  checked={values.privacyChecked}
                  onChange={handleChange}
                  className="mt-1 inline mx-0"
                />
                <p htmlFor="privacyChecked">
                  I’ve read and agree with the Terms of Service and our Privacy
                  Policy.
                </p>
              </div>
              {errors.privacyChecked && touched.privacyChecked && (
                <span className="text-xs text-red">
                  {errors.privacyChecked}
                </span>
              )}
            </div>
            <Button
              disabled={!isValid || !dirty}
              pending={isLoading}
              pill={true}
            >
              Sign up
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
