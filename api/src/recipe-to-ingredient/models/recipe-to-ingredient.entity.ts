import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base-models/base.entity';
import { Ingredient } from '../../ingredients/models/ingredient.entity';
import { SubRecipe } from '../../sub-recipe/models/sub-recipe.entity';

@ObjectType()
@Entity()
@Index(['subRecipeId', 'ingredientId'], { unique: true })
export class RecipeToIngredient extends BaseEntity {
  @Field()
  @Column()
  public subRecipeId: number;

  @Field()
  @Column()
  public ingredientId: number;

  @Field()
  @Column()
  public quantity: number;

  @Field(type => SubRecipe)
  @ManyToOne(() => SubRecipe, recipe => recipe.recipeToIngredient)
  public subRecipe: SubRecipe;

  @Field(type => Ingredient)
  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeToIngredient, { eager: true })
  public ingredient: Ingredient;
}
