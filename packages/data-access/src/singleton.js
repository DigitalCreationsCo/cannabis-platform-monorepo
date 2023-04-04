import { mockDeep, mockReset } from 'jest-mock-extended';
import prisma from './db/prisma';
jest.mock('./prisma', () => ({
    __esModule: true,
    default: mockDeep(),
}));
beforeEach(() => {
    mockReset(prismaMock);
});
export const prismaMock = prisma;
//# sourceMappingURL=singleton.js.map