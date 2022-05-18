import { Modal } from './modal';
import type { ModalProps } from './modal.d';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'atoms/Modal',
  component: Modal
};

export const gallery: Story<ModalProps> = args => (
  <>
    <Modal {...args} />
    <Modal {...args} />
  </>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<ModalProps> = args => <Modal {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
