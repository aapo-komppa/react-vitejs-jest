import axios from "axios";
import { PostType } from "../types/Post";

type resposenType = {
  data: {
    page: number;
    posts: PostType[];
  };
};

export const fetchPosts = async (params: {page: number, sl_token: string}): Promise<PostType[]> => {
  const response = await axios.get<resposenType>(
    "https://api.supermetrics.com/assignment/posts",
    { params }
  );

  if (!response.data.data.posts) {
    throw new Error("Failed to fetch posts");
  }

  return response.data.data.posts;
};
