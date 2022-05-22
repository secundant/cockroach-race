import { Dialog } from './dialog';
import { render, screen } from '@testing-library/react';

describe('molecules/dialog', () => {
  test('renders component successfully', () => {
    render(<Dialog testId="test-dialog" />);

    const element = screen.getByTestId('test-dialog');

    expect(element).toBeInTheDocument();
  });
});
