import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { Column, Entity } from 'typeorm';

@InputType()
@Entity()
export class CreateRecipeToIngredientDTO {
  @Field()
  @IsNumber()
  public ingredientId: number;

  @Field()
  @IsNumber()
  public quantity: number;
}
