import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { LoginCtx } from "../context/LoginContextProvider";
import { fetchPosts } from "../requests/fetchPosts";
import { useNavigate } from "react-router-dom";
import { PostType } from "../types/Post";
import PostListing from "../components/PostListing";
import Sender from "../components/Sender";
import SkipLink from "../components/SkipLink";
import React from "react";

const PostsPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [senders, setSenders] = useState<Map<string, number>>(new Map());
  const { loginToken } = useContext(LoginCtx);
  const { isLoading, isError, data: fetchedPosts } = useQuery("fetchPosts", () =>
    fetchPosts({ page: 1, loginToken })
  );

  useEffect(() => {
    if (isError) {
      navigate("/", { replace: true });
    }
  }, [isError]);

  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts);

      const tempMap = new Map<string, number>();
      posts.forEach((post) => {
        const previousAmount = tempMap.get(post.fromName) || 0;
        tempMap.set(post.fromName, previousAmount + 1);
      });
      setSenders(tempMap);
    }
  }, [fetchedPosts]);

  const handleSenderFilter = (sender: string): void => {
    if (!fetchedPosts) { return; }
    const filteredPosts = fetchedPosts.filter((post) => post.fromName === sender) ?? [];
    setPosts(filteredPosts);
  };

  const clearSenderFilter = (): void => {
    setPosts(fetchedPosts ?? []);
  };

  const getSendersAlphabetically = (): string[] => {
    const sendersArray = Array.from(senders.keys());
    return sendersArray.sort();
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <SkipLink skipTo="#main-content" className="">
        <button type="button">Skip Navigation Links</button>
      </SkipLink>
      <div className="">
        <div className="">
          <button onClick={clearSenderFilter} className="">
            Show from all senders
          </button>
          {getSendersAlphabetically().map((key) => (
            <button
              key={key}
              onClick={() => handleSenderFilter(key)}
              className=""
            >
              <Sender sender={key} amount={senders.get(key) ?? 0} />
            </button>
          ))}
        </div>
        <div className="" id="main-content">
          <PostListing posts={posts} />
        </div>
      </div>
    </>
  );
};

export default PostsPage;
