import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { LoginCtx } from "../context/LoginContextProvider";
import { fetchPosts } from "../requests/fetchPosts";
import { useNavigate } from "react-router-dom";
import { PostType } from "../types/Post";
import PostListing from "../components/PostListing";
import Sender from "../components/Sender";
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
      fetchedPosts.forEach((post) => {
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
      <div className="flex flex-row">
        <div className="bg-slate-100 rounded-xl p-8 m-10 mb-auto w-1/12">
          <button onClick={clearSenderFilter} className="font-bold text-left">
            Show from all senders
          </button>
          {getSendersAlphabetically().map((key) => (
            <button
              key={key}
              onClick={() => handleSenderFilter(key)}
              className="mt-1 font-bold text-left"
            >
              <Sender sender={key} amount={senders.get(key) ?? 0} />
            </button>
          ))}
        </div>
        <div className="m-10 ml-0 w-11/12" id="main-content">
          <PostListing posts={posts} />
        </div>
      </div>
    </>
  );
};

export default PostsPage;
