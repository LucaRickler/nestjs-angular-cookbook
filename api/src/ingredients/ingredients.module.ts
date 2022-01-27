import { Module } from '@nestjs/common';
import { IngredientsService } from './service/ingredients.service';
import { IngredientsController } from './controller/ingredients.controller';
import { Ingredient } from './models/ingredient.entity';
import { UnitsModule } from '../units/units.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ingredient]),
    UnitsModule,
  ],
  providers: [IngredientsService],
  controllers: [IngredientsController],
  exports: [IngredientsService],
})
export class IngredientsModule {}
