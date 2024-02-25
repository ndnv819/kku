import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '.';
import type { _CardProps } from './types';

export default {
  title: 'Atoms/Card',
  component: Card,
} as Meta<typeof Card>;

const Component = (args: _CardProps): JSX.Element => {
  return <Card {...args} />;
};

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    as: 'p',
  },
  render: Component,
};
