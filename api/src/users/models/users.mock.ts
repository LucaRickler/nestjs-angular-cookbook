import { User } from './user.entity';

const date = new Date(Date.now());

export const MockUsers: User[] = [
  {
    id: 1,
    username: 'john',
    password: 'changeme',
    email: 'john@example.com',
    admin: true,
    createTime: date,
    modifyTime: date,
  },
  {
    id: 2,
    username: 'ben',
    password: '12345',
    email: 'ben@example.com',
    admin: false,
    createTime: date,
    modifyTime: date,
  },
];
