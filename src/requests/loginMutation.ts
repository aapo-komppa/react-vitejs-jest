import axios from "axios";
import { LoginFormValues } from "../types/LoginFromValues";

const CLIENT_ID = "ju16a6m81mhid5ue1z3v2g0uh";

type LoginResponse = {
  data: {
    login_token: string;
    client_id: string;
    email: string;
  }
};

export const loginMutation = async (loginData: LoginFormValues) => {
  const response = await axios.post<LoginResponse>(
    `${import.meta.env.VITE_CLIENT_ID}/login`,
    { ...loginData, client_id: import.meta.env.VITE_CLIENT_ID },
  );

  return response.data.data.login_token;
};
