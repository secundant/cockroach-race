import { Icon } from './icon';
import type { IconProps } from './icon.d';
import { SPRITE_NAMES } from './sprite.meta';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'atoms/Icon',
  component: Icon
};

export const gallery: Story<IconProps> = args => (
  <div className="flex">
    {SPRITE_NAMES.map(name => (
      <div key={name} className="text-6xl m-4 p-6 rounded-lg bg-gray-100 text-cyan-700">
        <Icon {...args} name={name} />
      </div>
    ))}
  </div>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<IconProps> = args => <Icon {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {
  name: 'american'
};

export default csf;
