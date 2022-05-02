import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import PostListing from "./routes/PostsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/posts" element={<PostListing />} />
    </Routes>
  );
};

export default App;
