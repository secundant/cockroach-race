import { Form } from './form';
import { render, screen } from '@testing-library/react';

describe('atoms/form', () => {
  test('renders component successfully', () => {
    render(<Form testId="test-form" />);

    const element = screen.getByTestId('test-form');

    expect(element).toBeInTheDocument();
  });
});
