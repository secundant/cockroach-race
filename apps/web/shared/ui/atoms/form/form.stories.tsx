import { Form } from './form';
import type { FormProps } from './form.d';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'atoms/Form',
  component: Form
};

export const gallery: Story<FormProps> = args => (
  <>
    <Form {...args} />
    <Form {...args} />
  </>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<FormProps> = args => <Form {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
