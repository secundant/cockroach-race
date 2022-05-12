import { Input } from './input';
import type { InputProps } from './input.d';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'molecules/Input',
  component: Input
};

export const gallery: Story<InputProps> = args => (
  <div className="flex space-x-4">
    <Input {...args} />
    <Input {...args} disabled />
  </div>
);

gallery.storyName = 'Gallery';
gallery.args = {
  placeholder: 'Placeholder'
};

const Template: Story<InputProps> = args => <Input {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
