import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginProvider from "../../context/LoginContextProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const renderWithProviders = (
  Component: ReactNode
) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        <MemoryRouter>
          {Component}
        </MemoryRouter>
      </LoginProvider>
    </QueryClientProvider>
  );
};
