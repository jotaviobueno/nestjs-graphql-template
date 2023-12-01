import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { PersonRepository } from 'src/repositories/person';

@Module({
  providers: [PersonResolver, PersonService, PersonRepository],
  exports: [PersonService],
})
export class PersonModule {}
