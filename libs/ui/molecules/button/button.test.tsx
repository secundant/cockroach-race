import { Button } from './button';
import { render, screen } from '@testing-library/react';

describe('molecules/button', () => {
  test('renders component successfully', () => {
    render(<Button testId="test-button" />);

    const element = screen.getByTestId('test-button');

    expect(element).toBeInTheDocument();
  });
});
