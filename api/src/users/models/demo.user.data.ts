import { User } from './user.entity';

export const DemoUser : User =  {
  id: 0,
  username: 'demo',
  email: 'demo@demo.com',
  password: 'demo',
  admin: true,
  createTime: new Date(),
  modifyTime: new Date(),
}