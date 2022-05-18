import { ListItem } from './list-item';
import type { ListItemProps } from './list-item.d';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'atoms/ListItem',
  component: ListItem
};

export const gallery: Story<ListItemProps> = args => (
  <div className="max-w-[300px]">
    <ListItem {...args}>Regular</ListItem>
    <ListItem {...args}>Regular</ListItem>
    <ListItem {...args} disabled>
      Disabled
    </ListItem>
    <ListItem {...args} selected>
      Selected
    </ListItem>
  </div>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<ListItemProps> = args => <ListItem {...args}>List item</ListItem>;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
