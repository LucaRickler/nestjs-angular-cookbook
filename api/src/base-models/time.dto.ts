import { InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import { Field } from 'type-graphql';

@InputType()
export class TimeDTO {
  @Field()
  @IsOptional()
  @IsNumber()
  public cookingTime?: number;

  @Field()
  @IsOptional()
  @IsNumber()
  public restingTime?: number;

  @Field()
  @IsOptional()
  @IsNumber()
  public prepTime?: number;
}