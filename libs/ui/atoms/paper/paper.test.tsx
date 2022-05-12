import { Paper } from './paper';
import { render, screen } from '@testing-library/react';

describe('atoms/paper', () => {
  test('renders component successfully', () => {
    render(<Paper testId="test-paper" />);

    const element = screen.getByTestId('test-paper');

    expect(element).toBeInTheDocument();
  });
});
