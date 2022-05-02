import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { LoginCtx } from "../context/LoginContextProvider";
import { fetchPosts } from "../requests/fetchPosts";
import { useNavigate } from "react-router-dom";
import { PostType } from "../types/Post";
import PostListing from "../components/PostListing";
import Sender from "../components/Sender";
import classes from "./PostsPage.module.scss";
import SkipLink from "../components/SkipLink";
import React from "react";

const PostsPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [senders, setSenders] = useState<Map<string, number>>(new Map());
  const { sl_token } = useContext(LoginCtx);
  const { isLoading, isError, data } = useQuery("fetchPosts", () =>
    fetchPosts({ page: 1, sl_token })
  );

  useEffect(() => {
    if (isError) {
      navigate("/", { replace: true });
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      const posts = data.data.data.posts;
      setPosts(posts);

      const tempMap = new Map<string, number>();
      posts.forEach((post) => {
        const previousAmount = tempMap.get(post.from_name) || 0;
        tempMap.set(post.from_name, previousAmount + 1);
      });
      setSenders(tempMap);
    }
  }, [data]);

  const handleSenderFilter = (sender: string): void => {
    const filteredPosts =
      data?.data.data.posts.filter((post) => post.from_name === sender) ?? [];
    setPosts(filteredPosts);
  };

  const clearSenderFilter = (): void => {
    setPosts(data?.data.data.posts ?? []);
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
      <SkipLink skipTo="#main-content" className={classes.skipLink}>
        <button type="button">Skip Navigation Links</button>
      </SkipLink>
      <div className={classes.pageWrapper}>
        <div className={classes.senderWrapper}>
          <button onClick={clearSenderFilter} className={classes.clearBtn}>
            Show from all senders
          </button>
          {getSendersAlphabetically().map((key) => (
            <button
              key={key}
              onClick={() => handleSenderFilter(key)}
              className={classes.senderBtn}
            >
              <Sender sender={key} amount={senders.get(key) ?? 0} />
            </button>
          ))}
        </div>
        <div className={classes.listingWrapper} id="main-content">
          <PostListing posts={posts} />
        </div>
      </div>
    </>
  );
};

export default PostsPage;
