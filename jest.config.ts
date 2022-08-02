export default {
  roots: ["<rootDir>/src"],
  testRegex: "(/__tests__/.*\\.test)\\.(ts|js)$",
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  transform: {
    "^.+\\.js?$": "babel-jest",
    "^.+\\.ts?$": "ts-jest",
  },
};
