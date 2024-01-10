import React from 'react';

import { Typography, TypographyProps } from './index';

export default {
  title: 'Example/Typography',
  component: Typography,
  argTypes: {
    type: {
      control: { type: 'select', options: ['primary', 'secondary', 'neutral'] },
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
  type: 'primary',
  as: 'p',
};

export const Secondary = (args: TypographyProps<'p'>) => (
  <Typography {...args}>Sample Text</Typography>
);
Secondary.args = {
  type: 'secondary',
  as: 'p',
};
