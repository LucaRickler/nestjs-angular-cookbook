import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindConditions, Repository } from 'typeorm';
import { IngredientsService } from '../../ingredients/service/ingredients.service';
import { RecipeService } from '../../recipe/service/recipe.service';
import { SubRecipeService } from '../../sub-recipe/service/sub-recipe.service';
import { User } from '../../users/models/user.entity';
import { CreateRecipeToIngredientDTO } from '../models/create-recipe-to-ingredient.dto';
import { RecipeToIngredient } from '../models/recipe-to-ingredient.entity';
import { UpdateRecipeToIngredientDTO } from '../models/update-recipe-to-ingredient.dto';

@Injectable()
export class RecipeToIngredientService {
  constructor(
    @InjectRepository(RecipeToIngredient)
    private readonly recipeToIngredientRepository: Repository<RecipeToIngredient>,
    private readonly subRecipeService: SubRecipeService,
    private readonly ingredientService: IngredientsService,
  ) { }

  async findAll(subRecipeId: number): Promise<RecipeToIngredient[]> {
    return this.recipeToIngredientRepository.find({ where: { subRecipeId } });
  }

  async findOne(subRecipeId: number, ingredientId: number): Promise<RecipeToIngredient | undefined> {
    return this.recipeToIngredientRepository.findOne({ where: { subRecipeId, ingredientId } });
  }

  async create(
    recipeId: number,
    subRecipeId: number,
    createRecipeToIngredientDTO: CreateRecipeToIngredientDTO,
    user: User
  ): Promise<RecipeToIngredient> {
    if (await this.findOne(subRecipeId, createRecipeToIngredientDTO.ingredientId)) {
      throw new ConflictException();
    }

    const subRecipe = await this.subRecipeService.findOne(recipeId, subRecipeId);
    if (!subRecipe) {
      throw new UnprocessableEntityException();
    }

    const ingredient = await this.ingredientService.findOneByID(createRecipeToIngredientDTO.ingredientId);
    if (!ingredient) {
      throw new UnprocessableEntityException();
    }

    const recipeToIngredient: RecipeToIngredient = new RecipeToIngredient();
    recipeToIngredient.subRecipeId = subRecipeId;
    recipeToIngredient.ingredientId = createRecipeToIngredientDTO.ingredientId;
    recipeToIngredient.quantity = createRecipeToIngredientDTO.quantity;
    recipeToIngredient.createUser = user;
    return this.recipeToIngredientRepository.save(recipeToIngredient);
  }

  async update(subRecipeId: number, updateRecipeToIngredientDTO: UpdateRecipeToIngredientDTO, user: User): Promise<RecipeToIngredient> {
    const recipeToIngredient = await this.findOne(subRecipeId, updateRecipeToIngredientDTO.ingredientId);
    if (!recipeToIngredient) {
      throw new UnprocessableEntityException();
    }
    if (updateRecipeToIngredientDTO.quantity) {
      recipeToIngredient.quantity = updateRecipeToIngredientDTO.quantity;
    }
    recipeToIngredient.modifyUser = user;
    return this.recipeToIngredientRepository.save(recipeToIngredient);
  }

  async delete(subRecipeId: number, ingredientId: number): Promise<DeleteResult> {
    const item = await this.findOne(subRecipeId, ingredientId);
    return this.recipeToIngredientRepository.delete({ recipeToIngredientId: item.id } as FindConditions<RecipeToIngredient>);
  }


  async updateAll(
    recipeId: number,
    subRecipeId: number,
    updateRecipeToIngredientDTO: UpdateRecipeToIngredientDTO[],
    user: User
  ): Promise<RecipeToIngredient[]> {
    const current = await this.findAll(subRecipeId);

    for (const item of updateRecipeToIngredientDTO) {
      let found: boolean = false;
      for (const other of current) {
        if (other.ingredientId === item.ingredientId) {
          found = true;
        }
      }

      if (!found) {
        await this.create(recipeId, subRecipeId, item as CreateRecipeToIngredientDTO, user)
      }
    }

    for (const item of current) {
      let found: boolean = false;
      for (const other of updateRecipeToIngredientDTO) {
        if (other.ingredientId === item.ingredientId) {
          found = true;
          await this.update(subRecipeId, other, user);
        }
      }

      if (!found) {
        await this.delete(subRecipeId, item.ingredientId);
      }
    }

    return this.findAll(subRecipeId);
  }
}
