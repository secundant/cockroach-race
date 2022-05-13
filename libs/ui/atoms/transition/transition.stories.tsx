import Button from '../../molecules/button';
import Paper from '../paper';
import { Transition } from './transition';
import type { TransitionProps } from './transition.d';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

const csf: Meta = {
  title: 'atoms/Transition',
  component: Transition
};

export const gallery: Story<TransitionProps> = args => {
  const [open, setOpen] = useState<string[]>([]);
  const toggleBy = (value: string) => () =>
    setOpen(prev => (prev.includes(value) ? prev.filter(p => p !== value) : prev.concat(value)));
  const isOpen = (value: string) => open.includes(value);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex space-x-4">
          <Button onClick={toggleBy('grow')}>Grow</Button>
          <Button onClick={toggleBy('fade')}>Fade</Button>
        </div>
      </div>
      <div className="flex items-stretch justify-around p-4 bg-gray-200 rounded-xl">
        <div>
          <h5 className="text-lg">Grow</h5>
          <Transition {...args} type="grow" open={isOpen('grow')}>
            <Paper className="m-4 w-24 h-24" />
          </Transition>
        </div>
        <div>
          <h5 className="text-lg">Fade</h5>
          <Transition type="fade" open={isOpen('fade')}>
            <Paper className="m-4 w-24 h-24" />
          </Transition>
        </div>
      </div>
    </div>
  );
};

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<TransitionProps> = args => <Transition {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
