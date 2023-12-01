import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ log: ['error', 'query', 'info', 'warn'] });
  }

  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      await this.$transaction(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async (_) => {
          await this.changeMethod(params);
        },
        {
          maxWait: 5000000000, // default: 2000
          timeout: 5500000000, // default: 5000
        },
      );

      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }

  private async changeMethod(params: Prisma.MiddlewareParams) {
    switch (params.action) {
      case 'delete':
        params = {
          ...params,
          action: 'update',
          args: {
            ...params.args,
            data: {
              updatedAt: new Date(),
              deletedAt: new Date(),
            },
          },
        };
        break;
    }
  }
}
