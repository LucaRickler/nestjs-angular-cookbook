import { Field, InputType } from '@nestjs/graphql';
import { IsObject, IsString } from 'class-validator';
import { TimeDTO } from '../../base-models/time.dto';

@InputType()
export class CreateRecipeDto {
  @Field()
  @IsString()
  public title: string;

  @Field()
  @IsString()
  public desc: string;
}
