import { Portal } from './portal';
import { render, screen } from '@testing-library/react';

describe('atoms/portal', () => {
  test('renders component successfully', () => {
    render(<Portal testId="test-portal" />);

    const element = screen.getByTestId('test-portal');

    expect(element).toBeInTheDocument();
  });
});
