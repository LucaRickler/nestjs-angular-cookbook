
import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column('text')
  @Index({ unique: true })
  username: string;

  @Field()
  @Column('text')
  email: string;

  @Field()
  @Column({ default: false })
  admin: boolean;

  @Exclude()
  @Field({ nullable: true })
  @Exclude()
  @Column('text')
  password: string;

  @Field()
  @CreateDateColumn()
  createTime: Date;

  @Field()
  @UpdateDateColumn()
  modifyTime: Date;
}
