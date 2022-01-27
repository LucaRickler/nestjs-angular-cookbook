import { MockIngredients } from '../../ingredients/models/ingredients.mock';
import { MockRecipeToIngredients } from '../../recipe-to-ingredient/models/recipe-to-ingredient.mock';
import { MockRecipes } from '../../recipe/models/recipe.mock';
import { MockUsers } from '../../users/models/users.mock';
import { SubRecipe } from './sub-recipe.entity';

export const MockSubRecipe: SubRecipe[] = [
  {
    id: 0,
    instructions: '',
    desc: '',
    name: '',
    recipe: MockRecipes[0],
    recipeId: MockRecipes[0].id,
    recipeToIngredient: [],
    time: {
      cookingTime: 0,
      prepTime: 0,
      restingTime: 0,
    },
    createUser: MockUsers[0],
    createTime: new Date(Date.now()),
    modifyUser: MockUsers[0],
    modifyTime: new Date(Date.now()),
  }
];
