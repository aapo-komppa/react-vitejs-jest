import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginProvider from "./context/LoginContextProvider";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoginProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
