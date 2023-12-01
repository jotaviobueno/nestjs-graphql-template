import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { PersonEntity } from 'src/domain/entities';
import {
  CreatePersonInput,
  IdInput,
  QueryParamsInput,
  UpdatePersonInput,
} from 'src/domain/inputs';

@Resolver(() => PersonEntity)
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Mutation(() => PersonEntity)
  createPerson(
    @Args('createPersonInput') createPersonInput: CreatePersonInput,
  ) {
    return this.personService.create(createPersonInput);
  }

  @Query(() => [PersonEntity], { name: 'findAllPersons' })
  findAll(
    @Args('queryParams', { nullable: true })
    queryParamsInput: QueryParamsInput,
  ) {
    return this.personService.findAll(queryParamsInput);
  }

  @Query(() => PersonEntity, { name: 'findOnePerson' })
  findOne(@Args('personId') { id }: IdInput) {
    return this.personService.findOne(id);
  }

  @Mutation(() => PersonEntity)
  updatePerson(
    @Args('updatePersonInput') updatePersonInput: UpdatePersonInput,
  ) {
    return this.personService.update(updatePersonInput);
  }

  @Mutation(() => Boolean)
  removePerson(@Args('personId') { id }: IdInput) {
    return this.personService.softDelete(id);
  }
}
