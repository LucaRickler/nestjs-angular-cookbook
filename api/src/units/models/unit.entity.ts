import { Entity, Column, Index } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../base-models/base.entity';

@ObjectType()
@Entity()
export class Unit extends BaseEntity {
  @Field()
  @Column('text')
  @Index()
  name: string;

  @Field()
  @Column('text')
  symbol: string;
}
