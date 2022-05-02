import React from 'react';
import Login from '../routes/Login';

import { renderWithProviders } from './utils/TestingLibrary';
import { act } from 'react-dom/test-utils';
import { fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => (jest.fn())
}));

describe('Login component', () => {
  it('mounts', () => {
    renderWithProviders(<Login />);
  });

  it('validates email', async () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(<Login />)
    const emailInput = getByPlaceholderText('aapo.komppa@pp.inet.fi')
    
    userEvent.type(emailInput, 'invalidemail.com')
    fireEvent.blur(emailInput)

    await waitFor(() => {
      expect(getByText(/email must be a valid email/i)).toBeInTheDocument()
    })
  });
});

