import axios from "axios";
import { LoginFormValues } from "../types/LoginFromValues";

type LoginResponse = {
  login_token: string;
  client_id: string;
  email: string;
};

export const loginMutation = async (loginData: LoginFormValues) => {
  const response = await axios.post<LoginResponse>(
    `${import.meta.env.VITE_BACKEND_URL}/login`,
    { ...loginData, client_id: import.meta.env.VITE_CLIENT_ID },
  );

  return response.data.login_token;
};
