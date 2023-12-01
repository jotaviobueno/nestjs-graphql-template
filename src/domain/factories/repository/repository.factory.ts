import { Inject } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';

export class RepositoryFactory<K, T = void, J = void> {
  @Inject(PrismaService)
  public readonly prismaService: PrismaService;

  constructor(public model: string) {}

  create(input: T): Promise<K> {
    return this.prismaService[this.model].create({
      data: {
        ...input,
        deletedAt: null,
      },
    });
  }

  createMany(input: T[]) {
    return this.prismaService[this.model].createMany({
      data: input,
    });
  }

  forceFindById(id: string): Promise<K> {
    return this.prismaService[this.model].findFirst({
      where: {
        id,
      },
    });
  }

  findById(id: string): Promise<K> {
    return this.prismaService[this.model].findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findManyWithIds(ids: string[]): Promise<K[]> {
    return this.prismaService[this.model].findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  findAll(query: any): Promise<K[]> {
    return this.prismaService[this.model].findMany({
      ...query,
      where: {
        deletedAt: null,
      },
    });
  }

  update({ id, ...input }: J & { id?: string }): Promise<K> {
    return this.prismaService[this.model].update({
      where: {
        id,
      },
      data: {
        ...input,
        updatedAt: new Date(),
      },
    });
  }

  destroy(id: string): Promise<K> {
    return this.prismaService[this.model].delete({
      where: {
        id,
      },
    });
  }
}
