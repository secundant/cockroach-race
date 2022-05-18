import { Modal } from './modal';
import { render, screen } from '@testing-library/react';

describe('atoms/modal', () => {
  test('renders component successfully', () => {
    render(<Modal testId="test-modal" />);

    const element = screen.getByTestId('test-modal');

    expect(element).toBeInTheDocument();
  });
});
