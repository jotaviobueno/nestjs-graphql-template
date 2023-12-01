import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class QueryParamsInput {
  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  page?: number = 1;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  pageSize?: number = 200;
}
