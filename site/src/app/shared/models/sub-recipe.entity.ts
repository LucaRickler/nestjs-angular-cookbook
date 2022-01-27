import { Type } from 'class-transformer';
import { BaseItem } from './baseItem.entity';
import { Recipe } from './recipe.entity';
import { Time } from './time.entity';

export class SubRecipe implements BaseItem {
  id?: number;
  recipeId?: number;
  name?: string;
  desc?: string;
  instructions?: string;
  @Type(type => Time)
  time: Time;

  private _recipe: Recipe;
  get recipe(): Recipe {
    return this._recipe;
  }
  @Type(() => Recipe)
  set recipe(value: Recipe) {
    this._recipe = value;
    this.recipeId = value.id;
  }

  constructor() {
    this.id = undefined;
    this.recipeId = undefined;
    this.name = undefined;
    this.desc = undefined;
    this.instructions = undefined;
    this.time = new Time();
    this._recipe = new Recipe();
  }
}
