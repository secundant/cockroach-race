import { Portal } from './portal';
import type { PortalProps } from './portal.d';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'atoms/Portal',
  component: Portal
};

export const gallery: Story<PortalProps> = args => (
  <>
    <Portal {...args} />
    <Portal {...args} />
  </>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<PortalProps> = args => <Portal {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
