import { Module } from '@nestjs/common';
import { RecipeToIngredientService } from './service/recipe-to-ingredient.service';
import { RecipeToIngredientController } from './controller/recipe-to-ingredient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeToIngredient } from './models/recipe-to-ingredient.entity';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { Recipe } from '../recipe/models/recipe.entity';
import { SubRecipeModule } from '../sub-recipe/sub-recipe.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, RecipeToIngredient]),
    IngredientsModule,
    SubRecipeModule,
  ],
  controllers: [RecipeToIngredientController],
  providers: [RecipeToIngredientService],
  exports: [RecipeToIngredientService],
})
export class RecipeToIngredientModule {}
