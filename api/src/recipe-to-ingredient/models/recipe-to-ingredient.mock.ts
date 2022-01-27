import { MockIngredients } from '../../ingredients/models/ingredients.mock';
import { MockRecipes } from '../../recipe/models/recipe.mock';
import { MockSubRecipe } from '../../sub-recipe/models/sub-recipe.mock';
import { MockUsers } from '../../users/models/users.mock';
import { RecipeToIngredient } from './recipe-to-ingredient.entity';

export const MockRecipeToIngredients: RecipeToIngredient[] = [
  {
    id: 0,
    ingredient: MockIngredients[0],
    ingredientId: MockIngredients[0].id,
    quantity: 100,
    subRecipe: MockSubRecipe[0],
    subRecipeId: MockSubRecipe[0].id,
    createUser: MockUsers[0],
    createTime: new Date(Date.now()),
    modifyUser: MockUsers[0],
    modifyTime: new Date(Date.now()),
  },
  {
    id: 1,
    ingredient: MockIngredients[1],
    ingredientId: MockIngredients[1].id,
    quantity: 200,
    subRecipe: MockSubRecipe[0],
    subRecipeId: MockSubRecipe[0].id,
    createUser: MockUsers[0],
    createTime: new Date(Date.now()),
    modifyUser: MockUsers[0],
    modifyTime: new Date(Date.now()),
  },
];
