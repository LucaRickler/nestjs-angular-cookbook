import { Controller, UseInterceptors, ClassSerializerInterceptor, UseGuards, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { UnitsService } from '../service/units.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUnitDTO } from '../models/create-unit.dto';
import { CurrentUser } from '../../auth/user.decorator';
import { User } from '../../users/models/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('unit')
export class UnitsController {
  constructor(
    private readonly unitService: UnitsService,
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.unitService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getUnitByID(@Param('id') id: string) {
    return this.unitService.findOneByID(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  newUnit(
    @Body() createUnitDTO: CreateUnitDTO,
    @CurrentUser() user: User,
    ) {
    return this.unitService.create(createUnitDTO, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.unitService.delete(+id);
  }
}
