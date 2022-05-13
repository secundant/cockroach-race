import { Field } from './field';
import type { FieldProps } from './field.d';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'molecules/Field',
  component: Field
};

export const gallery: Story<FieldProps> = args => (
  <>
    <Field {...args} />
    <Field {...args} />
  </>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<FieldProps> = args => <Field {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
