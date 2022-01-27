import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CreateRecipeToIngredientDTO } from './create-recipe-to-ingredient.dto';

@InputType()
@Entity()
export class UpdateRecipeToIngredientDTO extends PartialType(CreateRecipeToIngredientDTO) {
}
