import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Unit } from '../../units/models/unit.entity';

@InputType()
export class CreateIngredientDTO {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsNumber()
  unitId: number;
}
