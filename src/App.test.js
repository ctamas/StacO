import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders page', () => {
  render(<App />);
  const resultsElement = screen.getByText(/Results/i);
  expect(resultsElement).toBeInTheDocument();
});
