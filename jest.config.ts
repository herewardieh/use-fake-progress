import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testRegex: ".*/(__tests__|tests)/.+\\.(generator|test|spec)\\.(ts|tsx)$",
};

export default config;
