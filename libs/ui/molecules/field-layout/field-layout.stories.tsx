import Input from '../input';
import { FieldLayout } from './field-layout';
import type { FieldLayoutProps } from './field-layout.d';
import { Meta, Story } from '@storybook/react/types-6-0';

const csf: Meta = {
  title: 'molecules/FieldLayout',
  component: FieldLayout
};

export const gallery: Story<FieldLayoutProps> = args => (
  <div className="flex flex-col space-y-4">
    <FieldLayout {...args} label="Foo" description="Next is foo">
      <Input placeholder="Foo" />
    </FieldLayout>
    <FieldLayout {...args} label="Bar">
      <Input placeholder="Bar" />
    </FieldLayout>
  </div>
);

gallery.storyName = 'Gallery';
gallery.args = {};

const Template: Story<FieldLayoutProps> = args => <FieldLayout {...args} />;

export const sandbox = Template.bind({});

sandbox.storyName = 'Sandbox';
sandbox.args = {};

export default csf;
