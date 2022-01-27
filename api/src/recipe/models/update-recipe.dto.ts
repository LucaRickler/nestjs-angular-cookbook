import { InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';

@InputType()
export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {}
