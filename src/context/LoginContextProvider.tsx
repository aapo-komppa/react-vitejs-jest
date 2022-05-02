import * as React from "react";

export type LoginContextType = {
  loginToken: string;
  setToken: (loginToken: string) => void;
};

const defaultValue: LoginContextType = {
  loginToken: "",
  setToken: () => {},
};

export const LoginCtx = React.createContext<LoginContextType>(defaultValue);

const LoginProvider: React.FC<React.ReactNode> = (props) => {
  const [loginToken, setLoginToken] = React.useState<string>(
    localStorage.getItem("loginToken") ?? ""
  );

  const setToken = (loginToken: string) => {
    localStorage.setItem("loginToken", loginToken);
    setLoginToken(loginToken);
  };

  return (
    <LoginCtx.Provider value={{ loginToken, setToken }}>
      {props.children}
    </LoginCtx.Provider>
  );
};

export default LoginProvider;
