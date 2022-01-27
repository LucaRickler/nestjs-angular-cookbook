import { Pipe, PipeTransform } from '@angular/core';
import { RecipeToIngredient } from '../models/recipe-to-ingredient.entity';

@Pipe({
  name: 'ingredient'
})
export class IngredientPipe implements PipeTransform {

  transform(value: RecipeToIngredient, scaleFactor: number = 1): string {
    return `${value.quantity * scaleFactor ?? ''}${value.ingredient.unit?.symbol ?? ''} ${value.ingredient.name ?? ''}`;
  }

}
