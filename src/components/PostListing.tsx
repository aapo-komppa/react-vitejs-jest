import React from "react";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import { PostType } from "../types/Post";

const PostListing: React.FC<{ posts: PostType[] }> = ({ posts }) => {
  const [postListing, setPostListing] = useState<PostType[]>([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterValue, setFilterValue] = useState<string>("");

  useEffect(() => {
    const sortedPosts = sortPosts(posts);
    const filteredPosts = sortedPosts.filter((post) =>
      post.message.toLowerCase().includes(filterValue.toLowerCase())
    );
    setPostListing(filteredPosts);
  }, [posts, sortDirection, filterValue]);

  const sortPosts = (posts: PostType[]): PostType[] => {
    // sort should be done on the BE side no such feature was documented on the assignment
    return posts.sort((a, b) => {
      if (sortDirection === "asc") {
        return (
          new Date(a.createdTime).getTime() -
          new Date(b.createdTime).getTime()
        );
      }
      return (
        new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
      );
    });
  };

  return (
    <div>
      <input onChange={(e) => setFilterValue(e.target.value)} placeholder="search posts" className="border-solid border-2 border-grey-400"></input>

      <button className="bg-blue-500 px-2 text-white ml-2 font-semibold rounded-lg shadow-md" onClick={() => setSortDirection("desc")}>Latest first</button>
      <button className="bg-blue-500 px-2 text-white ml-2 font-semibold rounded-lg shadow-md" onClick={() => setSortDirection("asc")}>oldest first</button>

      <ul>
        {postListing.map((post) => (
          <li key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostListing;
