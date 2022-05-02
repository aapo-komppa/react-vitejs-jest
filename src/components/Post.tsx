import React from "react";
import { PostType } from "../types/Post";

const Post: React.FC<{ post: PostType }> = ({ post }) => {
  return (
    <div>
      <h2>{post.from_name}</h2>
      <p>{post.message}</p>
      <p>{post.created_time}</p>
    </div>
  );
}

export default Post;