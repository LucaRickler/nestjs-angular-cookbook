import { ObjectType } from '@nestjs/graphql';
import { Field } from 'type-graphql';
import { Column } from 'typeorm';

@ObjectType()
export class Time {
  @Field()
  @Column({ nullable: true })
  public cookingTime?: number;

  @Field()
  @Column({ nullable: true })
  public restingTime?: number;

  @Field()
  @Column({ nullable: true })
  public prepTime?: number;
}