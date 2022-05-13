import { Field } from './field';
import { render, screen } from '@testing-library/react';

describe('molecules/field', () => {
  test('renders component successfully', () => {
    render(<Field testId="test-field" />);

    const element = screen.getByTestId('test-field');

    expect(element).toBeInTheDocument();
  });
});
