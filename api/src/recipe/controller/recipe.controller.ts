import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { RecipeService } from '../service/recipe.service';
import { CreateRecipeDto } from '../models/create-recipe.dto';
import { UpdateRecipeDto } from '../models/update-recipe.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../auth/user.decorator';
import { User } from '../../users/models/user.entity';

@Controller('recipe')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Body() createRecipeDto: CreateRecipeDto,
    @CurrentUser() user: User,
  ) {
    return this.recipeService.create(createRecipeDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('sub-recipe/available-for')
  // findSubRecipeNewRecipe() {
  //   return this.recipeService.findSubRecipeCandidates(null);
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('sub-recipe/available-for/:id')
  // findSubRecipeForRecipe(@Param('id') id?: string) {
  //   return this.recipeService.findSubRecipeCandidates(+id);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @CurrentUser() user: User,
  ) {
    return this.recipeService.update(+id, updateRecipeDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.delete(+id);
  }
}
