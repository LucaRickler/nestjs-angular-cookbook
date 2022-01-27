import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';
import { CurrentUser } from '../../auth/user.decorator';
import { User } from '../../users/models/user.entity';
import { CreateRecipeToIngredientDTO } from '../models/create-recipe-to-ingredient.dto';
import { RecipeToIngredient } from '../models/recipe-to-ingredient.entity';
import { UpdateRecipeToIngredientDTO } from '../models/update-recipe-to-ingredient.dto';
import { RecipeToIngredientService } from '../service/recipe-to-ingredient.service';

@Controller('recipe/:recipeId/sub-recipe/:subRecipeId/ingredients')
export class RecipeToIngredientController {
  constructor(private readonly recipeToIngredientService: RecipeToIngredientService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(
    @Param('subRecipeId') subRecipeId: string
  ) {
    return this.recipeToIngredientService.findAll(+subRecipeId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createMany(
    @Param('recipeId') recipeId: string,
    @Param('subRecipeId') subRecipeId: string,
    @Body() createRecipeToIngredientDTO: CreateRecipeToIngredientDTO[],
    @CurrentUser() user: User,
  ) {
    const response: Promise<RecipeToIngredient>[] = [];
    createRecipeToIngredientDTO.forEach(dto => {
      response.push(this.recipeToIngredientService.create(+recipeId, +subRecipeId, dto, user));
    });
    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  updateMany(
    @Param('recipeId') recipeId: string,
    @Param('subRecipeId') subRecipeId: string,
    @Body() updateRecipeToIngredientDTO: UpdateRecipeToIngredientDTO[],
    @CurrentUser() user: User,
  ) {
    return this.recipeToIngredientService.updateAll(+recipeId, +subRecipeId, updateRecipeToIngredientDTO, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  deleteAll(
    @Param('subRecipeId') subRecipeId: string,
    @Body() updateRecipeToIngredientDTO: UpdateRecipeToIngredientDTO[],
  ) {
    const response: Promise<DeleteResult>[] = [];
    updateRecipeToIngredientDTO.forEach(dto => {
      response.push(this.recipeToIngredientService.delete(+subRecipeId, dto.ingredientId));
    });
    return response;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':ingredientId')
  findOne(
    @Param('subRecipeId') subRecipeId: string,
    @Param('ingredientId') ingredientId: string,
  ) {
    return this.recipeToIngredientService.findOne(+subRecipeId, +ingredientId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':ingredientId')
  create(
    @Param('recipeId') recipeId: string,
    @Param('subRecipeId') subRecipeId: string,
    @Param('ingredientId') ingredientId: string,
    @Body() createRecipeToIngredientDTO: CreateRecipeToIngredientDTO,
    @CurrentUser() user: User,
  ) {
    return this.recipeToIngredientService.create(+recipeId, +subRecipeId, createRecipeToIngredientDTO, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':ingredientId')
  update(
    @Param('subRecipeId') subRecipeId: string,
    @Param('ingredientId') ingredientId: string,
    @Body() updateRecipeToIngredientDTO: UpdateRecipeToIngredientDTO,
    @CurrentUser() user: User,
  ) {
    return this.recipeToIngredientService.update(+subRecipeId, updateRecipeToIngredientDTO, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':ingredientId')
  delete(
    @Param('subRecipeId') subRecipeId: string,
    @Param('ingredientId') ingredientId: string,
  ) {
    return this.recipeToIngredientService.delete(+subRecipeId, +ingredientId);
  }
}
