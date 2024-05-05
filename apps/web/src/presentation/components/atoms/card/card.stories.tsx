import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './index';
import type { _CardProps } from './types';

export default {
  title: 'Atoms/Card',
  component: Card,
} as Meta<typeof Card>;

const Component = (args: _CardProps): JSX.Element => {
  const { children, ...rest } = args;
  return <Card {...rest}>{children}</Card>;
};

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: Component,
};
