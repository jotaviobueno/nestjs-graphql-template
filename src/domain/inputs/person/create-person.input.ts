import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePersonInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}
