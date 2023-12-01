import { Injectable } from '@nestjs/common';
import { PersonEntity } from 'src/domain/entities';
import { RepositoryFactory } from 'src/domain/factories';
import { CreatePersonInput, UpdatePersonInput } from 'src/domain/inputs';

@Injectable()
export class PersonRepository extends RepositoryFactory<
  PersonEntity,
  CreatePersonInput,
  UpdatePersonInput
> {
  constructor() {
    super('person');
  }
}
