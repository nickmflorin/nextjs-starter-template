/*
The project configuration for SASS unit tests using the "sass-true" package is located in
'src/styles/tests/jest.config.ts' (or './jest.config.ts' relative to this file).  That Jest
configuration file ONLY points to this 'scss.spec.ts' file, via the 'testMatch' configuration
option.  This is because Jest itself cannot run SASS unit tests, only "sass-true" can, so Jest
simply points to this 'scss.spec.ts' file which is then responsible for running the unit tests
pertaining to SASS functions and mixins.

This file should only ever contain one test - the test that is responsible for using "sass-true"
to run the testable files in this directory.
*/
import path from "path";

import glob from "glob";
import { runSass } from "sass-true";

const testPath = "**/*.test.scss";

describe("SASS", () => {
  const sassTestFiles = glob.sync(path.resolve(__dirname, testPath));

  sassTestFiles.forEach((file: string) => {
    runSass({ describe, it }, file);
  });
});
