import { render, screen } from '@testing-library/react';
import { SpriteIcon } from './sprite-icon';

describe('molecules/sprite-icon', () => {
    test('renders component successfully', () => {
        render(<SpriteIcon testId="test-sprite-icon" />);

        const element = screen.getByTestId("test-sprite-icon");

        expect(element).toBeInTheDocument();
    });
});
