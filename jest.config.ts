import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  automock: false,
  testMatch: [ '**/?(*.)+(spec|test).+(ts|tsx|js)' ],
  testPathIgnorePatterns: [ '/node_modules/', '/dist/' ],
};
export default config;
