import { Formik, Form } from "formik";
import { useContext } from "react";
import { useMutation } from "react-query";
import { object, string } from "yup";
import Input from "../components/Input";
import { LoginCtx } from "../context/LoginContextProvider";
import { loginMutation } from "../requests/loginMutation";
import { LoginFormValues } from "../types/LoginFromValues";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.scss";
import React from "react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(LoginCtx);

  const initialValues: LoginFormValues = {
    name: "",
    email: "",
  };

  const validationSchema = object({
    name: string().required(),
    email: string().email().required(),
  });

  const onSubmit = useMutation(loginMutation, {
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (token) => {
      setToken(token);
      navigate("/posts", { replace: true });
    },
  });

  if (onSubmit.isLoading) {
    return <div>Submitting...</div>;
  }

  return (
    <div className={classes.loginWrapper}>
      <div className={classes.loginForm}>
        <h1>Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          onSubmit={(data) => onSubmit.mutate(data)}
        >
          {(formik) => (
            <Form>
              <Input name="name" type="text" placeholder="Aapo"></Input>
              <Input
                name="email"
                type="email"
                placeholder="aapo.komppa@pp.inet.fi"
              ></Input>
              <button
                type="submit"
                name="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
