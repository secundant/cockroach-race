import { FieldLayout } from './field-layout';
import { render, screen } from '@testing-library/react';

describe('molecules/field-layout', () => {
  test('renders component successfully', () => {
    render(<FieldLayout testId="test-field-layout" />);

    const element = screen.getByTestId('test-field-layout');

    expect(element).toBeInTheDocument();
  });
});
