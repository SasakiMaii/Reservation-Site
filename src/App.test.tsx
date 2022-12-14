import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import ReservateComplete from './pages/books/ReservateComplete';
import NotFound from './pages/NotFound';

test('renders learn react link', () => {
  render(<NotFound />);
  const linkElement = screen.getByText(/お探しのページは見つかりません/i);
  expect(linkElement).toBeInTheDocument();
});
