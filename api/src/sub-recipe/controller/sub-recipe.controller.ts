import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { SubRecipeService } from '../service/sub-recipe.service';
import { CreateSubRecipeDTO } from '../models/create-sub-recipe.dto';
import { UpdateSubRecipeDTO } from '../models/update-sub-recipe.dto';
import { CurrentUser } from '../../auth/user.decorator';
import { User } from '../../users/models/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('recipe/:recipeId/sub-recipe')
export class SubRecipeController {
  constructor(private readonly subRecipeService: SubRecipeService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(
    @Param('recipeId') recipeId: string,
  ) {
    return this.subRecipeService.findAll(+recipeId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(
    @Param('recipeId') recipeId: string,
    @Param('id') id: string,
  ) {
    return this.subRecipeService.findOne(+recipeId, +id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Param('recipeId') recipeId: string,
    @Body() createSubRecipeDto: CreateSubRecipeDTO,
    @CurrentUser() user: User,
  ) {
    return this.subRecipeService.create(+recipeId, createSubRecipeDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('recipeId') recipeId: string,
    @Param('id') id: string,
    @Body() updateSubRecipeDto: UpdateSubRecipeDTO,
    @CurrentUser() user: User,
  ) {
    return this.subRecipeService.update(+recipeId, +id, updateSubRecipeDto, user);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Put()
  // updateAll(
  //   @Param('recipeId') recipeId: string,
  //   @Body() updateSubRecipeDto: UpdateSubRecipeDTO[],
  //   @CurrentUser() user: User,
  // ) {
  //   return this.subRecipeService.updateAll(+recipeId, updateSubRecipeDto, user);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(
    @Param('recipeId') recipeId: string,
    @Param('id') id: string,
  ) {
    return this.subRecipeService.delete(+recipeId, +id);
  }
}
