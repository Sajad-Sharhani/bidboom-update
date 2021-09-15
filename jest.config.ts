// eslint-disable-next-line node/no-extraneous-import
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest/presets/default-esm", // or other ESM presets
  // preset: "ts-jest", // or other ESM presets
  testMatch: ["**/*.test.[jt]s?(x)"],
  globalSetup: "./scripts/globalSetup.js",
  globalTeardown: "./scripts/globalTeardown.js",
  // testEnvironment: "./scripts/environment.ts",
  globals: {
    "ts-jest": {
      tsconfig: "./tests/tsconfig.json",
      useESM: true,
    },
  },
  transform: {
    // "^.+\\.ts?$": ["esbuild-jest", { target: "es2020", }] as [string, any],
  } as any,
  extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"],
};

export default config;
