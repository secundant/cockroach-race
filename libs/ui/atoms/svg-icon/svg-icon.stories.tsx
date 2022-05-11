import { Meta, Story } from '@storybook/react/types-6-0';
import { SvgIcon } from './svg-icon';
import type { SvgIconProps } from './svg-icon.d';

const csf: Meta = {
    title: 'atoms/SvgIcon',
    component: SvgIcon,
};

export const gallery: Story<SvgIconProps> = args => (
    <>
        <SvgIcon {...args} />
        <SvgIcon {...args} />
    </>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<SvgIconProps> = args => <SvgIcon {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
