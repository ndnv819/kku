import type { Meta, StoryObj } from '@storybook/react';

import type { ButtonProps } from './index';
import { Button } from './index';

export default {
  title: 'Atom/Button',
  component: Button,
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: ['basic', 'primary', 'success', 'info', 'danger'],
      },
    },
    appearances: {
      control: {
        type: 'select',
        options: ['filled', 'outline', 'ghost'],
      },
    },
    sizes: {
      control: {
        type: 'select',
        options: ['tiny', 'small', 'medium', 'large', 'giant'],
      },
    },
  },
} as Meta<typeof Button>;

const Component = (args: ButtonProps): JSX.Element => {
  return <Button {...args} />;
};
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    status: 'primary',
    appearances: 'filled',
    sizes: 'medium',
    children: <p>CLICK</p>,
  },
  render: Component,
};

export const LongText: Story = {
  args: {
    status: 'primary',
    appearances: 'filled',
    sizes: 'medium',
    children: <p>후기 작성하고 100톨 받기</p>,
  },
  render: Component,
};
