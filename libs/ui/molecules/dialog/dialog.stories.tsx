import { Dialog } from './dialog';
import type { DialogProps } from './dialog.d';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'molecules/Dialog',
  component: Dialog
};

export const gallery: Story<DialogProps> = args => (
  <>
    <Dialog {...args} />
    <Dialog {...args} />
  </>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<DialogProps> = args => <Dialog {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
