import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../ui/Button";
import InputGroup from "../../ui/InputGroup";
import { useLoginMutation } from "../api/apiSlice";
import { setUser } from "./authSlice";
import { Formik } from "formik";
import * as yup from "yup";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, data, isError, isSuccess, error }] =
    useLoginMutation();

  const formSchema = new yup.ObjectSchema({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup.string().required("Password is required"),
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
      toast.success("Successfully logged in");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
    if (isError) {
      console.error(error);
      toast.error("Couldn't login :(, Try again?");
    }
  }, [data, isSuccess, isError, dispatch, error, navigate]);

  const handleSubmit = (values) => {
    login(values);
  };

  return (
    <>
      <Toaster />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          dirty,
          handleChange,
          values,
          isValid,
          handleSubmit,
          touched,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-8">
            <InputGroup
              isInvalid={touched.email && !!errors.email}
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
              label="Email"
              pill={true}
            />
            <InputGroup
              isInvalid={touched.password && !!errors.password}
              name="password"
              value={values.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              error={errors.password}
              label="Password"
              pill={true}
            />
            <Button
              disabled={!isValid || !dirty}
              pending={isLoading}
              pill={true}
              type="submit"
            >
              Sign In
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
