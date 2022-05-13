import { Transition } from './transition';
import { render, screen } from '@testing-library/react';

describe('atoms/transition', () => {
  test('renders component successfully', () => {
    render(<Transition testId="test-transition" />);

    const element = screen.getByTestId('test-transition');

    expect(element).toBeInTheDocument();
  });
});
