import React from "react";
import { PostType } from "../types/Post";

const Post: React.FC<{ post: PostType }> = ({ post }) => {
  return (
    <div className="bg-slate-100 rounded-xl p-8 mt-3">
      <h2 className="font-bold">{post.fromName}</h2>
      <p>{post.message}</p>
      <p className="font-bold">{post.createdTime}</p>
    </div>
  );
}

export default Post;