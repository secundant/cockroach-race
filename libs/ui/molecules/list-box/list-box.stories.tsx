import { Meta, Story } from '@storybook/react/types-6-0';
import { ListBox } from './list-box';
import type { ListBoxProps } from './list-box.d';

const csf: Meta = {
  title: 'molecules/ListBox',
  component: ListBox
};

export const gallery: Story<ListBoxProps> = args => (
  <>
    <ListBox {...args} />
    <ListBox {...args} />
  </>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<ListBoxProps> = args => <ListBox {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
