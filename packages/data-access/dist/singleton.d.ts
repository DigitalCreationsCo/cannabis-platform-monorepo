import type { PrismaClient } from '@prisma/client';
import { DeepMockProxy } from 'jest-mock-extended';
export declare const prismaMock: DeepMockProxy<PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import(".prisma/client").Prisma.RejectOnNotFound | import(".prisma/client").Prisma.RejectPerOperation | undefined>>;
