import type { Config } from "@jest/types";
export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: "ts-jest",
     displayName: {
     name: "taskusnow-api",
     color: "greenBright",
   },
   verbose: true,
   setupFiles: ["dotenv/config"],
   testMatch: ["**/**/*.test.ts"],
   testEnvironment: "node",
   detectOpenHandles: true,
   collectCoverage: true,
   transform: { "^.+\\.tsx?$": "ts-jest" },
   globalTeardown: "<rootDir>/src/tests/jest-globals-teardown.ts",
   forceExit: true,
   coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/tests/**/*.test.ts",
  ],
 };
};