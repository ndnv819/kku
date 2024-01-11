import React from 'react';

import { Typography, TypographyProps } from './index';

export default {
  title: 'Example/Typography',
  component: Typography,
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: [
          'primary',
          'secondary',
          'neutral',
          'success',
          'info',
          'warning',
          'danger',
        ],
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
};

export const Primary = (args: TypographyProps<'p'>) => (
  <Typography {...args}>Sample Text</Typography>
);
Primary.args = {
  status: 'primary',
  as: 'p',
};

export const Secondary = (args: TypographyProps<'p'>) => (
  <Typography {...args}>Sample Text</Typography>
);
Secondary.args = {
  status: 'secondary',
  as: 'p',
};
