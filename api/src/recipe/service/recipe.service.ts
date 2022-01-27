import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindConditions, Repository } from 'typeorm';
import { Time } from '../../base-models/time.entity';
import { User } from '../../users/models/user.entity';
import { CreateRecipeDto } from '../models/create-recipe.dto';
import { Recipe } from '../models/recipe.entity';
import { UpdateRecipeDto } from '../models/update-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) { }

  async findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async findOne(id: number): Promise<Recipe | undefined> {
    return this.recipeRepository.findOne({ where: { id } });
  }

  // async findSubRecipeCandidates(id?: number): Promise<Recipe[]> {
  //   const subquery = getManager()
  //     .createQueryBuilder()
  //     .select('sr.parentRecipeId', 'parentId')
  //     .from(SubRecipe, 'sr')
  //     .having('COUNT(*) > 0')
  //     .groupBy('sr.parentRecipeId');

  //   return this.recipeRepository
  //     .createQueryBuilder('recipe')
  //     .where(id === null ? 'TRUE' : 'recipe.id != :id', { id })
  //     .andWhere('recipe.id not in (' + subquery.getQuery() + ')')
  //     .getMany();
  // }

  async create(createRecipeDto: CreateRecipeDto, user: User): Promise<Recipe> {
    const recipe: Recipe = new Recipe();
    recipe.title = createRecipeDto.title;
    recipe.desc = createRecipeDto.desc;
    recipe.createUser = user;
    const result = await this.recipeRepository.save(recipe);
    return result;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto, user: User): Promise<Recipe> {
    const recipe = await this.findOne(id);
    if (!recipe) {
      throw new UnprocessableEntityException();
    }
    if (updateRecipeDto.title) {
      recipe.title = updateRecipeDto.title;
    }
    if (updateRecipeDto.desc) {
      recipe.desc = updateRecipeDto.desc;
    }
    recipe.modifyUser = user;
    return this.recipeRepository.save(recipe);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.recipeRepository.delete({ id } as FindConditions<Recipe>);
  }
}
