import { Input } from './input';
import { render, screen } from '@testing-library/react';

describe('molecules/input', () => {
  test('renders component successfully', () => {
    render(<Input testId="test-input" />);

    const element = screen.getByTestId('test-input');

    expect(element).toBeInTheDocument();
  });
});
