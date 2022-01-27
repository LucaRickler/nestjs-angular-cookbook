import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base-models/base.entity';
import { Time } from '../../base-models/time.entity';
import { RecipeToIngredient } from '../../recipe-to-ingredient/models/recipe-to-ingredient.entity';
import { Recipe } from '../../recipe/models/recipe.entity';

@ObjectType()
@Entity()
export class SubRecipe extends BaseEntity {
  @Field()
  @Column()
  public recipeId: number;

  @Field(type => Recipe)
  @ManyToOne(() => Recipe, recipe => recipe.subRecipes)
  public recipe: Recipe;

  @Field()
  @Column('text')
  public name: string;

  @Field()
  @Column('text')
  public desc: string;

  @Field()
  @Column('text')
  public instructions: string;

  @Field(type => Time)
  @Column(type => Time)
  public time: Time;

  @Field(type => RecipeToIngredient)
  @OneToMany(() => RecipeToIngredient, recipeToIngredient => recipeToIngredient.subRecipe, { cascade: true })
  public recipeToIngredient: RecipeToIngredient[];

}
