import { render, screen } from '@testing-library/react';
import { ListBox } from './list-box';

describe('molecules/list-box', () => {
  test('renders component successfully', () => {
    render(<ListBox testId="test-list-box" />);

    const element = screen.getByTestId('test-list-box');

    expect(element).toBeInTheDocument();
  });
});
