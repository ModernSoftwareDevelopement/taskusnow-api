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
    globalTeardown: "<rootDir>/src/Task/tests/jest-globals-teardown.ts",
    forceExit: true,
    testResultsProcessor: "jest-sonar-reporter",   
    collectCoverageFrom: [
      "src/**/*.{ts,tsx,js,jsx}",            
      "!**/apiRoutes.ts",
      "!src/*.ts",
      "!**/*.test.ts",
    ],    
  };
};
