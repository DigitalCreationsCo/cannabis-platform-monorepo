"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaMock = void 0;
var jest_mock_extended_1 = require("jest-mock-extended");
var prisma_1 = __importDefault(require("./db/prisma"));
jest.mock('./prisma', function () { return ({
    __esModule: true,
    default: (0, jest_mock_extended_1.mockDeep)(),
}); });
beforeEach(function () {
    (0, jest_mock_extended_1.mockReset)(exports.prismaMock);
});
exports.prismaMock = prisma_1.default;
