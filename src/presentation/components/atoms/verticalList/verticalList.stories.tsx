/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

import type { ListProps, ListTypeProps } from './index';
import { VerticalList } from './index';

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  birthday: Date;
}

function createMockData(): User {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
  };
}

const users: User[] = faker.helpers.multiple(createMockData, { count: 100 });

function RowRenderer(props: ListTypeProps<User>) {
  const { item, style } = props;

  return (
    <div
      key={item.id}
      style={{
        borderBottom: '1px solid #ccc',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
    >
      <img
        src={item.avatar}
        alt={item.username}
        style={{ width: 50, height: 50, borderRadius: 99 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}>
        <p>{item.username}</p>
        <p>{item.email}</p>
      </div>
    </div>
  );
}

const Component = (args: ListProps<User>): JSX.Element => {
  return <VerticalList<User> {...args} />;
};

// 1. MetaData
export default {
  title: 'Atom/Vertical List',
  component: Component,
  argTypes: {
    rowHeight: {
      control: {
        type: 'number',
      },
    },
    data: {
      control: {
        type: 'object',
      },
    },
  },
} as Meta<typeof Component>;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    data: users,
    totalElements: users.length,
    rowHeight: 100,
    rowRenderer: RowRenderer,
  },
  render: Component,
};

export const RowHeight200: Story = {
  args: {
    data: users,
    totalElements: users.length,
    rowHeight: 200,
    rowRenderer: RowRenderer,
  },
  render: Component,
};

export const Empty: Story = {
  args: {
    data: [],
    totalElements: 0,
    rowRenderer: RowRenderer,
  },
  render: Component,
};
