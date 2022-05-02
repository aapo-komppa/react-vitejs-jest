import React from "react";
import { PostType } from "../types/Post";

const Post: React.FC<{ post: PostType }> = ({ post }) => {
  return (
    <div>
      <h2>{post.fromName}</h2>
      <p>{post.message}</p>
      <p>{post.createdTime}</p>
    </div>
  );
}

export default Post;