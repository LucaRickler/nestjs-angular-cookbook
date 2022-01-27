// import { ObjectType } from '@nestjs/graphql';
// import { Field } from 'type-graphql';
// import { Column, Entity, ManyToOne } from 'typeorm';
// import { BaseEntity } from '../../base-models/base.entity';
// import { Ingredient } from '../../ingredients/models/ingredient.entity';
// import { Recipe } from '../../recipe/models/recipe.entity';
// import { SubRecipe } from '../../sub-recipe/models/sub-recipe.entity';

// @ObjectType()
// @Entity()
// export class ScaledSubRecipe extends BaseEntity {
//   @Field()
//   @Column()
//   public recipeId: number;

//   // @Field(type => Recipe)
//   // @ManyToOne(() => Recipe, recipe => recipe.scaledSubRecipe)
//   // public recipe: Recipe;

//   @Field()
//   @Column()
//   public subRecipeId: number;

//   @Field(type => SubRecipe)
//   @ManyToOne(() => SubRecipe, subRecipe => subRecipe.recipe, { cascade: true, eager: true })
//   public subRecipe: SubRecipe;

//   @Field()
//   @Column()
//   public ingredientId: number;

//   @Field(type => Ingredient)
//   @ManyToOne(() => Ingredient, { eager: true })
//   public ingredient: Ingredient;

//   @Field()
//   @Column({type: 'float'})
//   public scaledQuantity: number;
// }
