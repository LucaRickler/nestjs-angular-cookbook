import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindConditions, Repository } from 'typeorm';
import { Time } from '../../base-models/time.entity';
import { RecipeService } from '../../recipe/service/recipe.service';
import { User } from '../../users/models/user.entity';
import { CreateSubRecipeDTO } from '../models/create-sub-recipe.dto';
import { SubRecipe } from '../models/sub-recipe.entity';
import { UpdateSubRecipeDTO } from '../models/update-sub-recipe.dto';

@Injectable()
export class SubRecipeService {
  constructor(
    @InjectRepository(SubRecipe)
    private readonly subRecipeRepository: Repository<SubRecipe>,
    private readonly recipeService: RecipeService,
  ) { }

  async findAll(recipeId: number): Promise<SubRecipe[]> {
    // TODO: find all by recipeId
    return this.subRecipeRepository.find({ recipeId });
  }

  async findOne(recipeId: number, subRecipeid: number): Promise<SubRecipe> {
    return this.subRecipeRepository.findOne({ where: { id: subRecipeid, recipeId } });
  }

  async create(recipeId: number, createSubRecipeDTO: CreateSubRecipeDTO, user: User): Promise<SubRecipe> {
    // if (await this.findOne(parentRecipeId, createSubRecipeDTO.recipeId)) {
    //   throw new ConflictException();
    // }
    const recipe = await this.recipeService.findOne(recipeId);
    if(!recipe) {
      throw new UnprocessableEntityException();
    }

    const subRecipe: SubRecipe = new SubRecipe();
    subRecipe.recipe = recipe;
    subRecipe.name = createSubRecipeDTO.name;
    subRecipe.desc = createSubRecipeDTO.desc;
    subRecipe.time = createSubRecipeDTO.time as Time;
    subRecipe.instructions = createSubRecipeDTO.instructions;
    subRecipe.createUser = user;
    return this.subRecipeRepository.save(subRecipe);
  }

  async update(recipeId: number, subRecipeid: number, updateSubRecipe: UpdateSubRecipeDTO, user: User): Promise<SubRecipe> {
    const subRecipe = await this.findOne(recipeId, subRecipeid);
    if (!subRecipe) {
      throw new UnprocessableEntityException();
    }
    if (updateSubRecipe.name) {
      subRecipe.name = updateSubRecipe.name;
    }
    if (updateSubRecipe.desc) {
      subRecipe.desc = updateSubRecipe.desc;
    }
    if (updateSubRecipe.desc) {
      subRecipe.desc = updateSubRecipe.desc;
    }
    if (updateSubRecipe.time) {
      subRecipe.time = updateSubRecipe.time as Time;
    }
    subRecipe.modifyUser = user;
    return this.subRecipeRepository.save(subRecipe);
  }

  // async updateAll(recipeId: number, updateSubRecipe: UpdateSubRecipeDTO[], user: User): Promise<SubRecipe[]> {
  //   const current = await this.findAll(recipeId);

  //   for (const item of updateSubRecipe) {
  //     let found: boolean = false;
  //     for (const other of current) {
  //       if (other.id === item.id && other.ingredientId === item.ingredientId) {
  //         found = true;
  //       }
  //     }

  //     if (!found) {
  //       await this.create(recipeId, item as CreateSubRecipeDTO, user)
  //     }
  //   }

  //   for (const item of current) {
  //     let found: boolean = false;
  //     for (const other of updateSubRecipe) {
  //       if (other.recipeId === item.recipeId && other.ingredientId === item.ingredientId) {
  //         found = true;
  //         await this.update(recipeId, other, user);
  //       }
  //     }

  //     if (!found) {
  //       await this.delete(recipeId, item.recipeId);
  //     }
  //   }

  //   return this.findAll(recipeId);
  // }

  async delete(recipeId: number, subRecipeid: number): Promise<DeleteResult> {
    const item = await this.findOne(recipeId, subRecipeid);
    return this.subRecipeRepository.delete({ id: item.id } as FindConditions<SubRecipe>);
  }
}
