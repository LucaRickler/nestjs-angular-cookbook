import { Ingredient } from './ingredient.entity';
import { MockUnits } from '../../units/models/units.mock';
import { MockUsers } from '../../users/models/users.mock';

export const MockIngredients: Ingredient[] = [
  {
    id: 0,
    name: 'flour',
    unit: MockUnits[0],
    recipeToIngredient: null,
    createUser: MockUsers[0],
    createTime: new Date(Date.now()),
    modifyUser: MockUsers[0],
    modifyTime: new Date(Date.now()),

  },
  {
    id: 1,
    name: 'milk',
    unit: MockUnits[1],
    recipeToIngredient: null,
    createUser: MockUsers[0],
    createTime: new Date(Date.now()),
    modifyUser: MockUsers[0],
    modifyTime: new Date(Date.now()),
  },
  {
    id: 2,
    name: 'sugar',
    unit: MockUnits[2],
    recipeToIngredient: null,
    createUser: MockUsers[0],
    createTime: new Date(Date.now()),
    modifyUser: MockUsers[0],
    modifyTime: new Date(Date.now()),
  },
];
