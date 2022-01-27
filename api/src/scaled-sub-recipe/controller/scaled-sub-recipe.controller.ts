// import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
// import { ScaledSubRecipeService } from '../service/scaled-sub-recipe.service';
// import { CreateScaledSubRecipeDto } from '../models/create-scaled-sub-recipe.dto';
// import { UpdateScaledSubRecipeDto } from '../models/update-scaled-sub-recipe.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { CurrentUser } from '../../auth/user.decorator';
// import { User } from '../../users/models/user.entity';

// @Controller('recipe/:recipeId/sub-recipe/scaled/')
// export class ScaledSubRecipeController {
//   constructor(private readonly scaledSubRecipeService: ScaledSubRecipeService) {}

//   @UseGuards(AuthGuard('jwt'))
//   @Get()
//   findAll(
//     @Param('recipeId') recipeId: string,
//   ) {
//     return this.scaledSubRecipeService.findAll(+recipeId);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Get(':subRecipeId')
//   findOne(
//     @Param('recipeId') recipeId: string,
//     @Param('subRecipeId') subRecipeId: string,
//     ) {
//     return this.scaledSubRecipeService.findOne(+recipeId, +subRecipeId);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Post()
//   create(
//     @Param('recipeId') recipeId: string,
//     @Body() createScaledSubRecipeDto: CreateScaledSubRecipeDto,
//     @CurrentUser() user: User,
//   ) {
//     return this.scaledSubRecipeService.create(+recipeId, createScaledSubRecipeDto, user);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Put(':id')
//   update(
//     @Param('recipeId') recipeId: string,
//     @Param('subRecipeId') subRecipeId: string,
//     @Body() updateScaledSubRecipeDto: UpdateScaledSubRecipeDto,
//     @CurrentUser() user: User,
//   ) {
//     return this.scaledSubRecipeService.update(+recipeId, +subRecipeId, updateScaledSubRecipeDto, user);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Delete(':id')
//   remove(
//     @Param('recipeId') recipeId: string,
//     @Param('subRecipeId') subRecipeId: string,
//   ) {
//     return this.scaledSubRecipeService.remove(+recipeId, +subRecipeId);
//   }
// }
