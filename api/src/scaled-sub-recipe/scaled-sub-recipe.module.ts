// import { Module } from '@nestjs/common';
// import { ScaledSubRecipeService } from './service/scaled-sub-recipe.service';
// import { ScaledSubRecipeController } from './controller/scaled-sub-recipe.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ScaledSubRecipe } from './models/scaled-sub-recipe.entity';
// import { RecipeModule } from '../recipe/recipe.module';
// import { IngredientsModule } from '../ingredients/ingredients.module';
// import { RecipeToIngredientModule } from '../recipe-to-ingredient/recipe-to-ingredient.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([ScaledSubRecipe]),
//     RecipeModule,
//     RecipeToIngredientModule,
//   ],
//   controllers: [ScaledSubRecipeController],
//   providers: [ScaledSubRecipeService],
//   exports: [ScaledSubRecipeService]
// })
// export class ScaledSubRecipeModule {}
