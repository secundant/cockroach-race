import { Paper } from './paper';
import type { PaperProps } from './paper.d';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'atoms/Paper',
  component: Paper
};

export const gallery: Story<PaperProps> = args => (
  <div className="flex space-x-4 items-start">
    <Paper {...args} className="p-4">
      <div className="w-24 h-32 bg-gray-100" />
    </Paper>
    <Paper {...args} className="p-4">
      <div className="w-24 h-24 bg-gray-100" />
    </Paper>
  </div>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<PaperProps> = args => <Paper {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
