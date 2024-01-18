/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';
import { Story } from '@storybook/react';

import { ListProps, VerticalList } from './index';

interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  birthday: Date;
}

function createFakeUserData(): User {
  return {
    _id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
  };
}

function createRandomUsers(count: number): User[] {
  return faker.helpers.multiple(createFakeUserData, { count });
}

export default {
  title: 'Atom/VerticalList',
  component: VerticalList,
};

const Component = (args: ListProps<User>): JSX.Element => {
  const users = createRandomUsers(100);
  return <VerticalList {...args} data={users} totalElements={users.length} />;
};

export const Default: Story<ListProps<User>> = (args) => (
  <Component {...args} />
);

Default.args = {
  rowRenderer: ({ index, item, style }) => (
    <div
      key={index}
      style={{
        ...style,
        borderBottom: '1px solid #ccc',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
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
  ),
};
