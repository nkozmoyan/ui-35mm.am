import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import App from './App';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: [] }),
}));

test('renders 35mm.am header', () => {
  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ user: null, login: jest.fn(), logout: jest.fn() }}>
        <App />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  const headerElement = screen.getByText('35mm.am');
  expect(headerElement).toBeInTheDocument();
});
