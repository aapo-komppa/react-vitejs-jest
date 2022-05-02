import { Formik, Form } from "formik";
import { useContext } from "react";
import { useMutation } from "react-query";
import { object, string } from "yup";
import Input from "../components/Input";
import { LoginCtx } from "../context/LoginContextProvider";
import { loginMutation } from "../requests/loginMutation";
import { LoginFormValues } from "../types/LoginFromValues";
import { useNavigate } from "react-router-dom";
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
    <div className="flex">
      <div className="bg-slate-100 rounded-xl p-8 mx-auto mt-10">
        <h1 className="text-center text-xl mb-3">Login to the app</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          onSubmit={(data) => onSubmit.mutate(data)}
        >
          {(formik) => (
            <Form className="flex flex-col">
              <Input
                name="name"
                type="text"
                placeholder="Aapo"
                className="mt-3 border-solid border-2 invalid:border-pink-500 invalid:text-pink-600"
                required={true}
              ></Input>
              <Input
                name="email"
                type="email"
                placeholder="aapo.komppa@pp.inet.fi"
                required={true}
                className="mt-3 border-solid border-2 invalid:border-pink-500 invalid:text-pink-600 "
              ></Input>
              <button
                type="submit"
                name="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="mt-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md "
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
