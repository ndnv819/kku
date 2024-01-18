import { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonProps } from './index';

export default {
  title: 'Atom/Button',
  component: Button,
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: ['basic', 'primary', 'success', 'info', 'warning', 'danger'],
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
  return <Button {...args}>클릭하기</Button>;
};
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    status: 'primary',
    appearances: 'filled',
    sizes: 'medium',
  },
  render: Component,
};
