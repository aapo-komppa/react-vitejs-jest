import * as React from "react";

export type LoginContextType = {
  sl_token: string;
  setToken: (sl_token: string) => void;
};

const defaultValue: LoginContextType = {
  sl_token: "",
  setToken: () => {},
};

export const LoginCtx = React.createContext<LoginContextType>(defaultValue);

const LoginProvider: React.FC<React.ReactNode> = (props) => {
  const [sl_token, setSlToken] = React.useState<string>(
    localStorage.getItem("sl_token") ?? ""
  );

  const setToken = (sl_token: string) => {
    localStorage.setItem("sl_token", sl_token);
    setSlToken(sl_token);
  };

  return (
    <LoginCtx.Provider value={{ sl_token, setToken }}>
      {props.children}
    </LoginCtx.Provider>
  );
};

export default LoginProvider;
