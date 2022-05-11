import { SpriteIcon } from './sprite-icon';
import type { SpriteIconProps } from './sprite-icon.d';
import { SPRITE_NAMES } from './sprite.meta';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'molecules/SpriteIcon',
  component: SpriteIcon
};

export const gallery: Story<SpriteIconProps> = args => (
  <div className="flex">
    {SPRITE_NAMES.map(name => (
      <div key={name} className="text-6xl m-4 p-6 rounded-lg bg-gray-100 text-cyan-700">
        <SpriteIcon {...args} name={name} />
      </div>
    ))}
  </div>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<SpriteIconProps> = args => <SpriteIcon {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {
  name: 'american'
};

export default csf;
