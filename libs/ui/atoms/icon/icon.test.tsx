import { Icon } from './icon';
import { render, screen } from '@testing-library/react';

describe('atoms/icon', () => {
  test('renders component successfully', () => {
    render(<Icon testId="test-icon" />);

    const element = screen.getByTestId('test-icon');

    expect(element).toBeInTheDocument();
  });
});
