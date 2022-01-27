// import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
// import { DeleteResult, Repository } from 'typeorm';
// import { RecipeToIngredientService } from '../../recipe-to-ingredient/service/recipe-to-ingredient.service';
// import { RecipeService } from '../../recipe/service/recipe.service';
// import { SubRecipeService } from '../../sub-recipe/service/sub-recipe.service';
// import { User } from '../../users/models/user.entity';
// import { CreateScaledSubRecipeDto } from '../models/create-scaled-sub-recipe.dto';
// import { ScaledSubRecipe } from '../models/scaled-sub-recipe.entity';
// import { UpdateScaledSubRecipeDto } from '../models/update-scaled-sub-recipe.dto';

// @Injectable()
// export class ScaledSubRecipeService {
//   constructor(
//     private readonly scaledSubRecipeRepository: Repository<ScaledSubRecipe>,
//     private readonly recipeService: RecipeService,
//     private readonly subRecipeService: SubRecipeService,
//     private readonly recipeToIngredientService: RecipeToIngredientService,
//   ) { }

//   async findAll(recipeId: number): Promise<ScaledSubRecipe[]> {
//     return this.scaledSubRecipeRepository.find({ recipeId });
//   }

//   async findOne(recipeId: number, subRecipeId: number): Promise<ScaledSubRecipe> {
//     return this.scaledSubRecipeRepository.findOne({ recipeId, subRecipeId });
//   }

//   async create(recipeId: number, createScaledSubRecipeDto: CreateScaledSubRecipeDto, user: User): Promise<ScaledSubRecipe> {
//     if (await this.findOne(recipeId, createScaledSubRecipeDto.subRecipeId)) {
//       throw new ConflictException();
//     }

//     const recipe = await this.recipeService.findOne(recipeId);
//     if (!recipe) {
//       throw new UnprocessableEntityException();
//     }

//     const subRecipe = await this.subRecipeService.findOne(createScaledSubRecipeDto.subRecipeId);
//     if (!subRecipe) {
//       throw new UnprocessableEntityException();
//     }

//     const ingredient = await this.recipeToIngredientService.findOne(createScaledSubRecipeDto.subRecipeId, createScaledSubRecipeDto.ingredientId);
//     if (!ingredient) {
//       throw new UnprocessableEntityException();
//     }

//     const scaledSubRecipe: ScaledSubRecipe = new ScaledSubRecipe();
//     scaledSubRecipe.recipe = recipe;
//     scaledSubRecipe.subRecipe = subRecipe;
//     scaledSubRecipe.ingredientId = createScaledSubRecipeDto.ingredientId;
//     scaledSubRecipe.scaledQuantity = createScaledSubRecipeDto.scaledQuantity;
//     scaledSubRecipe.createUser = user;
//     return this.scaledSubRecipeRepository.save(scaledSubRecipe);
//   }

//   async update(recipeId: number, subRecipeId: number, updateScaledSubRecipeDto: UpdateScaledSubRecipeDto, user: User): Promise<ScaledSubRecipe> {
//     const scaledSubRecipe = await this.findOne(recipeId, subRecipeId);
//     if (!scaledSubRecipe) {
//       throw new UnprocessableEntityException();
//     }
//     if (updateScaledSubRecipeDto.scaledQuantity) {
//       scaledSubRecipe.scaledQuantity = updateScaledSubRecipeDto.scaledQuantity;
//     }
//     scaledSubRecipe.modifyUser = user;
//     return this.scaledSubRecipeRepository.save(scaledSubRecipe);
//   }

//   async remove(recipeId: number, subRecipeId: number): Promise<DeleteResult> {
//     const item = await this.findOne(recipeId, subRecipeId);
//     return this.scaledSubRecipeRepository.delete({ id: item.id });
//   }
// }
