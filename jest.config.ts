import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  automock: false,
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/','jest.config.ts'],
  collectCoverage: true,
  coverageReporters: ['clover', 'json', 'lcov', ['text', { 'skipFull': true }]],
  coverageDirectory: 'coverage',
};
export default config;
