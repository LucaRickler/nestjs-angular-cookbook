import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeIngredientsComponent } from './components/recipe-ingredients/recipe-ingredients.component';
import { IndexComponent } from './components/index/index.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CreateIngredientComponent } from './components/create-ingredient/create-ingredient.component';
import { CreateUnitComponent } from './components/create-unit/create-unit.component';
import { SubRecipeComponent } from './components/sub-recipe/sub-recipe.component';
import { SubRecipeContainerComponent } from './components/sub-recipe-container/sub-recipe-container.component';


@NgModule({
  declarations: [
    RecipeIngredientsComponent,
    RecipeComponent,
    IndexComponent,
    CreateIngredientComponent,
    CreateUnitComponent,
    SubRecipeComponent,
    SubRecipeContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RecipeRoutingModule,
    SharedModule,
  ],
  // exports: [
  //   RecipeIngredientsComponent,
  //   RecipeComponent,
  //   IndexComponent
  // ],
})
export class RecipeModule { }
