import { Module } from '@nestjs/common';
import { SubRecipeService } from './service/sub-recipe.service';
import { SubRecipeController } from './controller/sub-recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubRecipe } from './models/sub-recipe.entity';
import { RecipeModule } from '../recipe/recipe.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubRecipe]),
    RecipeModule,
  ],
  controllers: [SubRecipeController],
  providers: [SubRecipeService],
  exports: [SubRecipeService],
})
export class SubRecipeModule {}
