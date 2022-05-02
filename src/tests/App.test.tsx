import React from 'react';
import App from '../App';

import { renderWithProviders } from './utils/TestingLibrary';
import { act } from 'react-dom/test-utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => (jest.fn())
}));

describe('App component', () => {
  it('mounts', () => {
    renderWithProviders(<App />);
  });
});
