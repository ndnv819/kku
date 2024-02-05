import type { Meta, StoryObj } from '@storybook/react';

import type { _TypographyProps } from './index';
import { Typography } from './index';

// MetaData 작성
export default {
  title: 'Atom/Typography',
  component: Typography,
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: ['primary', 'success', 'info', 'warning', 'danger'],
      },
    },
    category: {
      control: {
        type: 'select',
        options: ['s1', 's2', 'p1', 'p2', 'c1', 'c2', 'label'],
      },
    },
    as: {
      control: {
        type: 'select',
        options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      },
    },
  },
} as Meta<typeof Typography>;

// 스토리 작성
const Component = (args: _TypographyProps): JSX.Element => {
  return <Typography {...args}>테스트 텍스트</Typography>;
};
type Story = StoryObj<typeof Typography>;
export const Default: Story = {
  args: {
    as: 'p',
  },
  render: Component,
};

export const Heading: Story = {
  args: {
    as: 'h1',
  },
  render: Component,
};

export const Primary: Story = {
  args: {
    status: 'primary',
    as: 'p',
  },
  render: Component,
};
