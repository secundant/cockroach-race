import { OverlayInvisible } from './overlay-invisible';
import type { OverlayInvisibleProps } from './overlay-invisible.d';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'atoms/OverlayInvisible',
  component: OverlayInvisible
};

export const gallery: Story<OverlayInvisibleProps> = args => (
  <>
    <OverlayInvisible {...args} />
    <OverlayInvisible {...args} />
  </>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<OverlayInvisibleProps> = args => <OverlayInvisible {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
