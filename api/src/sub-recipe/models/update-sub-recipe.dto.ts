import { InputType, PartialType } from '@nestjs/graphql';
import { Entity } from 'typeorm';
import { CreateSubRecipeDTO } from './create-sub-recipe.dto';

@InputType()
@Entity()
export class UpdateSubRecipeDTO extends PartialType(CreateSubRecipeDTO) { }
