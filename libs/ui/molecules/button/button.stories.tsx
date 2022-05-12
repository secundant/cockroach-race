import { Button } from './button';
import type { ButtonAppearance, ButtonProps, ButtonSize } from './button.d';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'molecules/Button',
  component: Button
};

export const gallery: Story<ButtonProps> = args => (
  <div className="space-y-4">
    {sizes.map(size => (
      <div className="space-x-4 flex" key={size}>
        {appearances.map(appearance => (
          <Button {...args} key={appearance} appearance={appearance} size={size}>
            {size} - {appearance}
          </Button>
        ))}
        <Button {...args} disabled size={size}>
          {size} - disabled
        </Button>
      </div>
    ))}
  </div>
);

const sizes: ButtonSize[] = ['sm', 'md'];
const appearances: ButtonAppearance[] = ['flat', 'accent', 'outline'];

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<ButtonProps> = args => <Button {...args}>Button</Button>;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
