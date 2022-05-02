import axios from "axios";
import { PostType } from "../types/Post";

type resposenType = {
  page: number;
  posts: PostType[];
};

export const fetchPosts = async (params: {page: number, loginToken: string}): Promise<PostType[]> => {
  const response = await axios.get<resposenType>(
    `${process.env.VITE_BACKEND_URL}/posts`,
    { params }
  );

  if (!response.data.posts) {
    throw new Error("Failed to fetch posts");
  }

  return response.data.posts;
};
