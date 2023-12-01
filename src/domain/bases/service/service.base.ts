import { QueryParamsInput } from 'src/domain/inputs';

export abstract class ServiceBase<K, T = void, J = void> {
  abstract createMany(input: T[]): Promise<unknown>;
  abstract create(input: T): Promise<K>;
  abstract findOne(id: string): Promise<K>;
  abstract findManyWithIds(ids: string[]): Promise<K[]>;
  abstract findAll(queryParams: QueryParamsInput): Promise<K[]>;
  abstract update(input: J): Promise<K>;
  abstract softDelete(id: string): Promise<boolean>;
  abstract remove(id: string): Promise<boolean>;
}
