import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserDTO {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field({nullable: true})
  @IsOptional()
  @IsString()
  password: string;

  @Field({nullable: true})
  @IsOptional()
  @IsEmail()
  email: string;

  @Field()
  @IsOptional()
  @IsBoolean()
  admin: boolean;
}
