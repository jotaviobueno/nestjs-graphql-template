import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreatePersonInput } from './create-person.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePersonInput extends PartialType(CreatePersonInput) {
  @Field()
  @IsMongoId()
  @IsNotEmpty()
  id?: string;
}
