import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base-models/base.entity';
import { Time } from '../../base-models/time.entity';
import { SubRecipe } from '../../sub-recipe/models/sub-recipe.entity';


@ObjectType()
@Entity()
export class Recipe extends BaseEntity {
  @Field()
  @Column('text')
  public title: string;

  @Field()
  @Column('text')
  public desc: string;

  @Field(type => SubRecipe)
  @OneToMany(() => SubRecipe, subRecipe => subRecipe.recipe, { cascade: true, eager: true })
  public subRecipes: SubRecipe[];
}
