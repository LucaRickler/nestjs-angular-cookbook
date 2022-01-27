import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../auth/user.decorator';
import { User } from '../../users/models/user.entity';
import { CreateIngredientDTO } from '../models/create-ingredient.dto';
import { IngredientsService } from '../service/ingredients.service';

@Controller('ingredient')
export class IngredientsController {
  constructor(
    private readonly ingredientsService: IngredientsService,
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.ingredientsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getIngredientByID(@Param(':id') id: string) {
    return this.ingredientsService.findOneByID(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  newIngredient(
    @Body() createIngredientDTO: CreateIngredientDTO,
    @CurrentUser() user: User,
  ) {
    return this.ingredientsService.create(createIngredientDTO, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateIngredient(
    @Param(':id') id: string,
    @Body() createIngredientDTO: CreateIngredientDTO,
    @CurrentUser() user: User,
  ) {
    return this.ingredientsService.update(+id, createIngredientDTO, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param(':id') id: string) {
    return this.ingredientsService.delete(+id);
  }
}
