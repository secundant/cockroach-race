import { render, screen } from '@testing-library/react';
import { SvgIcon } from './svg-icon';

describe('atoms/svg-icon', () => {
    test('renders component successfully', () => {
        render(<SvgIcon testId="test-svg-icon" />);

        const element = screen.getByTestId("test-svg-icon");

        expect(element).toBeInTheDocument();
    });
});
