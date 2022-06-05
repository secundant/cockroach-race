import { ListBoxItem } from './list-box-item';
import { render, screen } from '@testing-library/react';

describe('atoms/list-item', () => {
  test('renders component successfully', () => {
    render(<ListBoxItem testId="test-list-item" />);

    const element = screen.getByTestId('test-list-item');

    expect(element).toBeInTheDocument();
  });
});
