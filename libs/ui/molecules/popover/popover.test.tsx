import { Popover } from './popover';
import { render, screen } from '@testing-library/react';

describe('molecules/popover', () => {
  test('renders component successfully', () => {
    render(<Popover testId="test-popover" />);

    const element = screen.getByTestId('test-popover');

    expect(element).toBeInTheDocument();
  });
});
