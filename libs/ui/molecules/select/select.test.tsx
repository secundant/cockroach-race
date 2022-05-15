import { Select } from './select';
import { render, screen } from '@testing-library/react';

describe('molecules/select', () => {
  test('renders component successfully', () => {
    render(<Select testId="test-select" />);

    const element = screen.getByTestId('test-select');

    expect(element).toBeInTheDocument();
  });
});
