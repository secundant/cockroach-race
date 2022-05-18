import { ListItem } from './list-item';
import { render, screen } from '@testing-library/react';

describe('atoms/list-item', () => {
  test('renders component successfully', () => {
    render(<ListItem testId="test-list-item" />);

    const element = screen.getByTestId('test-list-item');

    expect(element).toBeInTheDocument();
  });
});
