/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';
import { ListTypeProps } from '@presentation/components/atoms/verticalList';
import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { InfiniteList, type InfiniteListProps } from './index';

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

const InfiniteListComponent = (args: InfiniteListProps<User>): JSX.Element => {
  const [data, setData] = useState<User[]>(users.slice(0, 30));
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const fetchNextPage = () => {
    if (!isFetching) {
      setIsFetching(true);
      setTimeout(() => {
        const moreData = users.slice(data.length, data.length + 30);
        setData([...data, ...moreData]);
        if (data.length >= users.length - 30) {
          setHasNextPage(false);
        }
        setIsFetching(false);
      }, 1000);
    }
  };

  return (
    <InfiniteList<User>
      {...args}
      data={data}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetching}
      fetchNextPage={fetchNextPage}
      rowRenderer={RowRenderer}
    />
  );
};

// 1. MetaData
export default {
  title: 'Atom/InfiniteList',
  component: InfiniteListComponent,
  argTypes: {
    rowHeight: {
      control: {
        type: 'number',
      },
    },
  },
} as Meta<typeof InfiniteListComponent>;

type Story = StoryObj<typeof InfiniteListComponent>;

export const Default: Story = {
  args: {
    rowHeight: 100,
    emptyRenderer: () => <div>No items available.</div>,
    bottomLoaderRender: () => <div>Loading more...</div>,
  },
  render: InfiniteListComponent,
};

export const RowHeight200: Story = {
  args: {
    rowHeight: 200,
    emptyRenderer: () => <div>No items available.</div>,
    bottomLoaderRender: () => <div>Loading more...</div>,
  },
  render: InfiniteListComponent,
};

export const Empty: Story = {
  args: {
    data: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: () => {},
    rowRenderer: RowRenderer,
    rowHeight: 100,
    emptyRenderer: () => <div>No items available.</div>,
    bottomLoaderRender: () => <div>Loading more...</div>,
  },
  render: InfiniteListComponent,
};
