import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { TimeDTO } from '../../base-models/time.dto';

@InputType()
@Entity()
export class CreateSubRecipeDTO {
  @Field()
  @IsString()
  public name: string;

  @Field()
  @IsString()
  public desc: string;

  @Field()
  @IsString()
  public instructions: string;

  @Field()
  @IsObject()
  public time: TimeDTO;
}
