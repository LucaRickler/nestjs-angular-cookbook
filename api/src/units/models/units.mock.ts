import { MockUsers } from '../../users/models/users.mock';
import { Unit } from './unit.entity';

export const MockUnits: Unit[] = [
  {
    id: 0,
    name: 'gram',
    symbol: 'g',
    createUser: MockUsers[0],
    createTime: new Date(Date.now()),
    modifyUser: MockUsers[0],
    modifyTime: new Date(Date.now()),
  },
  {
    id: 1,
    name: 'centiliter',
    symbol: 'cl',
    createUser: MockUsers[0],
    createTime: new Date(Date.now()),
    modifyUser: MockUsers[0],
    modifyTime: new Date(Date.now()),
  },
];
