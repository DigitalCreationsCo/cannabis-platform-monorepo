import { mockDeep, mockReset } from 'jest-mock-extended';
import prisma from './prisma';
jest.mock('./prisma', () => ({
    __esModule: true,
    default: mockDeep(),
}));
beforeEach(() => {
    // eslint-disable-next-line no-use-before-define
    mockReset(prismaMock);
});
export const prismaMock = prisma;
