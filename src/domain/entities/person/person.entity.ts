import { Field, ObjectType } from '@nestjs/graphql';
import { Person } from '@prisma/client';

@ObjectType()
export class PersonEntity implements Person {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt: Date | null;
}
