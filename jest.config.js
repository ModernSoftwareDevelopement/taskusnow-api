// export const preset = "ts-jest";
// export const testEnvironment = "node";
// export const moduleNameMapper = {
//   "^@/(.*)$": "<rootDir>/src/$1",
// };
// export const testMatch = ["**/__tests__/**/*.test.ts"];
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
};
