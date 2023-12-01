import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/domain/bases';
import { PersonEntity } from 'src/domain/entities';
import {
  CreatePersonInput,
  QueryParamsInput,
  UpdatePersonInput,
} from 'src/domain/inputs';
import { QueryBuilder } from 'src/domain/utils';
import { PersonRepository } from 'src/repositories/person';

@Injectable()
export class PersonService
  implements
    Partial<ServiceBase<PersonEntity, CreatePersonInput, UpdatePersonInput>>
{
  constructor(private readonly personRepository: PersonRepository) {}

  create(input: CreatePersonInput): Promise<PersonEntity> {
    return this.personRepository.create(input);
  }

  async findAll(queryParams: QueryParamsInput): Promise<PersonEntity[]> {
    const query = new QueryBuilder(queryParams).handle();
    const data = await this.personRepository.findAll(query);

    return data;
  }

  async findOne(id: string): Promise<PersonEntity> {
    const person = await this.personRepository.findById(id);

    if (!person)
      throw new HttpException('Person not found', HttpStatus.NOT_FOUND);

    return person;
  }

  async update({ id, ...input }: UpdatePersonInput): Promise<PersonEntity> {
    const person = await this.findOne(id);

    const update = await this.personRepository.update({
      ...input,
      id: person.id,
    });

    if (!update)
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async softDelete(id: string): Promise<boolean> {
    const person = await this.findOne(id);

    const remove = await this.personRepository.destroy(person.id);

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
