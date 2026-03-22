import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hero section with club name', () => {
  render(<App />);
  const headingElement = screen.getByText(/Innovate in the Cloud/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  expect(screen.getByText(/About/i)).toBeInTheDocument();
  expect(screen.getByText(/Team/i)).toBeInTheDocument();
  expect(screen.getByText(/Events/i)).toBeInTheDocument();
});
