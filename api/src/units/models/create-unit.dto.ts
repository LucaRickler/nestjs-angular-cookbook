import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty} from 'class-validator';

@InputType()
export class CreateUnitDTO {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  symbol: string;
}
