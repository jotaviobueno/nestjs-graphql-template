import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { PersonModule } from './modules/person/person.module';
import { PrismaModule } from './db/prisma/prisma.module';

@Module({
  imports: [GraphqlModule, PrismaModule, PersonModule],
})
export class AppModule {}
