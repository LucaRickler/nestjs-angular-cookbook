import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base-models/base.entity';
import { RecipeToIngredient } from '../../recipe-to-ingredient/models/recipe-to-ingredient.entity';
import { Unit } from '../../units/models/unit.entity';

@ObjectType()
@Entity()
export class Ingredient extends BaseEntity {
  @Field()
  @Column('text')
  name: string;

  @Field(type => Unit)
  @ManyToOne(() => Unit, { eager: true })
  @JoinColumn({ name: 'unitId' })
  unit: Unit;

  @Field(type => RecipeToIngredient)
  @OneToMany(() => RecipeToIngredient, recipeToIngredient => recipeToIngredient.ingredient)
  recipeToIngredient: RecipeToIngredient[];
}
