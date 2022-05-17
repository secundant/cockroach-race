import Button from '../button';
import { Popover } from './popover';
import type { PopoverProps } from './popover.d';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

const csf: Meta = {
  title: 'molecules/Popover',
  component: Popover
};

export const gallery: Story<PopoverProps> = args => {
  const [anchorNode, setAnchorNode] = useState<HTMLElement | null>(null);

  return (
    <>
      <Button onClick={e => setAnchorNode(e.currentTarget)}>Open</Button>
      <Popover
        {...args}
        className="p-4"
        open={!!anchorNode}
        anchorNode={anchorNode}
        onClose={() => setAnchorNode(null)}
      >
        Popover content
      </Popover>
    </>
  );
};

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<PopoverProps> = args => <Popover {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
