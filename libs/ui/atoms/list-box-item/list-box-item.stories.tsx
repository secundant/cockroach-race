import { ListBoxItem } from './list-box-item';
import type { ListBoxItemProps } from './list-box-item.d';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'atoms/ListItem',
  component: ListBoxItem
};

export const gallery: Story<ListBoxItemProps> = args => (
  <div className="max-w-[300px]">
    <ListBoxItem {...args}>Regular</ListBoxItem>
    <ListBoxItem {...args}>Regular</ListBoxItem>
    <ListBoxItem {...args} disabled>
      Disabled
    </ListBoxItem>
    <ListBoxItem {...args} selected>
      Selected
    </ListBoxItem>
  </div>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<ListBoxItemProps> = args => <ListBoxItem {...args}>List item</ListBoxItem>;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
