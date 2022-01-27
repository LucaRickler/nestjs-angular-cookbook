import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserDTO {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field({nullable: true})
  @IsString()
  password: string;

  @Field({nullable: true})
  @IsEmail()
  email: string;

  @Field()
  @IsBoolean()
  admin: boolean;
}
