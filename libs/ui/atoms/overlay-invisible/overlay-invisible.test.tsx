import { OverlayInvisible } from './overlay-invisible';
import { render, screen } from '@testing-library/react';

describe('atoms/overlay-invisible', () => {
  test('renders component successfully', () => {
    render(<OverlayInvisible testId="test-overlay-invisible" />);

    const element = screen.getByTestId('test-overlay-invisible');

    expect(element).toBeInTheDocument();
  });
});
