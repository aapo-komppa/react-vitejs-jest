import axios from "axios";
import { LoginFormValues } from "../types/LoginFromValues";

const CLIENT_ID = "ju16a6m81mhid5ue1z3v2g0uh";

type LoginResponse = {
  data: {
    sl_token: string;
    client_id: string;
    email: string;
  }
};

export const loginMutation = (loginData: LoginFormValues) => {
  return axios.post<LoginResponse>(
    "https://api.supermetrics.com/assignment/register",
    { ...loginData, client_id: CLIENT_ID },
  );
};
