import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeService } from './service/recipe.service';
import { RecipeController } from './controller/recipe.controller';
import { Recipe } from './models/recipe.entity';
import { RecipeToIngredient } from '../recipe-to-ingredient/models/recipe-to-ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, RecipeToIngredient]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule { }
