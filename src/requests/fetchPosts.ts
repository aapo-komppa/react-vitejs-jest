import axios from "axios";
import { PostType } from "../types/Post";

type resposenType = {
  data: {
    page: number;
    posts: PostType[];
  };
};

export const fetchPosts = (params: {page: number, sl_token: string}) => {
  return axios.get<resposenType>(
    "https://api.supermetrics.com/assignment/posts",
    { params }
  );
};
