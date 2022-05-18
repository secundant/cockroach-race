import { Select } from './select';
import type { SelectProps } from './select.d';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'organisms/Select',
  component: Select
};

export const gallery: Story<SelectProps> = args => (
  <>
    <Select {...args} placeholder="Select" />
    <Select {...args} />
  </>
);

gallery.storyName = 'Gallery';
gallery.args = {
  data: [
    {
      value: 'foo',
      label: 'Foo'
    },
    {
      value: 'bar',
      label: 'Second item'
    }
  ]
};

const Template: Story<SelectProps> = args => <Select {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
