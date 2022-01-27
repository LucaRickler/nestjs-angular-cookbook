import { ID, ObjectType } from '@nestjs/graphql';
import { Field } from 'type-graphql';
import { CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/models/user.entity';

@ObjectType()
export abstract class BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @CreateDateColumn()
  createTime: Date;

  @Field()
  @ManyToOne(() => User)
  createUser: User;

  @Field()
  @UpdateDateColumn({ nullable: true })
  modifyTime: Date;

  @Field()
  @ManyToOne(() => User, { nullable: true })
  modifyUser: User;
}