import type { Config } from "jest";
// types

import { moduleFileExtensions } from "./config/paths";

import { compilerOptions } from "./tsconfig.json";
// Typescript Config files

const pathsToModuleNameMapper = (
  paths: Record<string, string[]>,
  options: {
    prefix: string;
  }
): Record<string, string> =>
  Object.entries(paths).reduce(
    (previous, [alias, [path]]) => ({
      ...previous,
      [`^${alias}`.replace("*", "(.*)")]: `${options.prefix}/${path}`.replace(
        "*",
        "$1"
      ),
    }),
    {}
  );

const config: Config = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  setupFiles: ["react-app-polyfill/jsdom"],
  setupFilesAfterEnv: ["<rootDir>/src/renderer/setupTests.ts"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
  ],
  testEnvironment: "jsdom",
  testRunner: "./node_modules/jest-circus/runner.js",
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/config/jest/babelTransform.js",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|json)$)":
      "<rootDir>/config/jest/fileTransform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
  ],
  modulePaths: [],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  moduleFileExtensions: [...moduleFileExtensions, "node"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  resetMocks: true,
};

export default config;
