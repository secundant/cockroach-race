import { OverlayBlur } from './overlay-blur';
import { render, screen } from '@testing-library/react';

describe('atoms/overlay-blur', () => {
  test('renders component successfully', () => {
    render(<OverlayBlur testId="test-overlay-blur" />);

    const element = screen.getByTestId('test-overlay-blur');

    expect(element).toBeInTheDocument();
  });
});
