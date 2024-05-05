/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker'; // Adjust the import according to your project structure
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import type { InfiniteListProps, InfiniteListRowType } from './index';
import { InfiniteList } from './index';

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

function RowComponent(props: InfiniteListRowType<User>): JSX.Element {
  const { rowIndex, item, style } = props;

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
      <h3 style={{ marginRight: 16 }}>{rowIndex + 1}</h3>
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

  const fetchNextPage = (): void => {
    setTimeout(() => {
      const moreData = users.slice(data.length, data.length + 30);
      setData((prevData) => [...prevData, ...moreData]);
    }, 5000);
  };

  useEffect(() => {
    if (data.length >= users.length - 30) {
      setHasNextPage(false);
    }
  }, [data, users]);

  return (
    <InfiniteList<User>
      {...args}
      data={data}
      hasNextPage={hasNextPage}
      isFetchingNextPage={false}
      fetchNextPage={fetchNextPage}
      rowComponent={RowComponent}
    />
  );
};

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
    emptyComponent: () => <div>No items available.</div>,
    bottomLoaderComponent: () => <div>Loading more...</div>,
  },
  render: InfiniteListComponent,
};

export const RowHeight200: Story = {
  args: {
    rowHeight: 200,
    emptyComponent: () => <div>No items available.</div>,
    bottomLoaderComponent: () => <div>Loading more...</div>,
  },
  render: InfiniteListComponent,
};

export const CustomBottomLoader: Story = {
  args: {
    rowHeight: 100,
    bottomLoaderComponent: () => (
      <div style={{ textAlign: 'center', marginTop: 20 }}>Loading more...</div>
    ),
  },
  render: InfiniteListComponent,
};

export const Empty: Story = {
  args: {
    data: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: () => {},
    rowComponent: RowComponent,
    rowHeight: 100,
  },
  render: InfiniteListComponent,
};

export const CustomEmptyComponent: Story = {
  args: {
    data: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: () => {},
    rowComponent: RowComponent,
    rowHeight: 100,
    emptyComponent: () => (
      <div style={{ textAlign: 'center' }}>No items available.</div>
    ),
  },
  render: InfiniteListComponent,
};
