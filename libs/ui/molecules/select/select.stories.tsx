import { Select } from './select';
import type { SelectProps } from './select.d';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'molecules/Select',
  component: Select
};

export const gallery: Story<SelectProps> = args => (
  <>
    <Select {...args} />
    <Select {...args} />
  </>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<SelectProps> = args => <Select {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
