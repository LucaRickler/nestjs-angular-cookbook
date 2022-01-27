import { MockUsers } from '../../users/models/users.mock';
import { Recipe } from './recipe.entity';

export const MockRecipes: Recipe[] = [
  {
    id: 0,
    title: 'title 1',
    desc: 'mock 1',
    subRecipes: [],
    createUser: MockUsers[0],
    createTime: new Date(Date.now()),
    modifyUser: MockUsers[0],
    modifyTime: new Date(Date.now()),
  },
  {
    id: 1,
    title: 'title 2',
    desc: 'mock 2',
    subRecipes: [],
    createUser: MockUsers[0],
    createTime: new Date(Date.now()),
    modifyUser: MockUsers[0],
    modifyTime: new Date(Date.now()),
  },
];
