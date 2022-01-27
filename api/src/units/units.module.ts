import { Module } from '@nestjs/common';
import { UnitsController } from './controller/units.controller';
import { UnitsService } from './service/units.service';
import { Unit } from './models/unit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  controllers: [UnitsController],
  providers: [UnitsService],
  exports: [UnitsService],
})
export class UnitsModule {}
