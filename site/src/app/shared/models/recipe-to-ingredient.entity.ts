import { Type } from 'class-transformer';
import { Ingredient } from './ingredient.entity';

export class RecipeToIngredient {
  recipeToIngredientId?: number;
  subRecipeId?: number;
  ingredientId?: number;
  quantity: number;

  private _ingredient: Ingredient;
  get ingredient(): Ingredient {
    return this._ingredient;
  }
  @Type(() => Ingredient)
  set ingredient(value: Ingredient) {
    this._ingredient = value;
    this.ingredientId = value.id;
  }

  constructor() {
    this.ingredientId = undefined;
    this.subRecipeId = undefined;
    this.recipeToIngredientId = undefined;
    this.quantity = 0;
    this._ingredient = new Ingredient();
  }
}
