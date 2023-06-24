
const packageJson = require('./package.json');
const tsConfigFile = './tsconfig.json';

/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
    displayName: `${packageJson.name}:unit`,
    verbose: true,
    preset: 'ts-jest',
    rootDir: './',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        NODE_ENV: 'test',
    },
    testMatch: ['<rootDir>/src/**/test/**/*.{js,jsx,ts,tsx}'],
    setupFilesAfterEnv: [
        '<rootDir>/jest.setup.mjs',
        '@testing-library/jest-dom/extend-expect'
    ],
    testPathIgnorePatterns: ['**/node_modules/', '/.next/'], // Don't test any next tests or tests in the modules
    transform: {
        '^.+\\.(js|jsx)$': '../../node_modules/babel-jest', // babel .js or .jsx files
        "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub", // anything style related is ignored and mapped to jest-transform-stub module
        'ts-jest': {
            tsconfig: tsConfigFile,
        },
    },
    collectCoverage: false,
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: [
        '<rootDir>/**/*.{ts,tsx,js,jsx}',
        '!**/*.test.{js,ts,tsx,jsx}',
        '!**/__mock__/*',
    ],
};

module.exports = config;
