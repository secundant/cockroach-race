import { OverlayBlur } from './overlay-blur';
import type { OverlayBlurProps } from './overlay-blur.d';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'atoms/OverlayBlur',
  component: OverlayBlur
};

export const gallery: Story<OverlayBlurProps> = args => (
  <>
    <OverlayBlur {...args} />
    <OverlayBlur {...args} />
  </>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<OverlayBlurProps> = args => <OverlayBlur {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
