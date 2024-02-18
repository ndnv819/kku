import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '.';
import type { CardProps } from './types';

export default {
  titld: 'Organisms/Card',
  component: Card,
  argTypes: {
    category: {
      control: {
        type: 'select',
        options: ['large', 'medium', 'small'],
      },
    },
  },
} as Meta<typeof Card>;

const Component = (args: CardProps): JSX.Element => {
  return <Card {...args} />;
};

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    category: 'medium',
    thumbUrl:
      'https://plus.unsplash.com/premium_photo-1700575181289-b5248a43e7f0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    title: '디폴트 테스트',
    subTitle: '이것은 테스트입니다.',
    description:
      'Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos. Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos. Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos.',
  },
  render: Component,
};

export const Large: Story = {
  args: {
    category: 'large',
    thumbUrl:
      'https://plus.unsplash.com/premium_photo-1700575181289-b5248a43e7f0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
    title: '디폴트 테스트',
    subTitle: '이것은 테스트입니다.',
    description:
      'Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos. Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos. Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos.',
    caption: '이 자리는 캡션',
    buttons: {
      filledButtonTitle: '완료',
      filledButtonOnClick() {
        console.log('완료 클릭');
      },
      ghostButtonTitle: '취소',
      ghostButtonOnClick() {
        console.log('취소 클릭');
      },
    },
  },
  render: Component,
};

export const Small: Story = {
  args: {
    category: 'small',
    description:
      'Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos. Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos. Beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos.',
  },
  render: Component,
};
