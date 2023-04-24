import { withBaseConfig } from "../../../jest.config.base";

/**
 * The Jest configuration {@link jest.Config} that should be used for running SASS unit tests
 * using the "sass-true" package.
 *
 * These configurations do not (and cannot) use the async function that {@link withNextConfig}
 * returns - which is inconsistent with every other Jest "project" configuration.  This is because
 * NextJS's configurations do not work with the SASS unit testing framework, "sass-true", so instead
 * the {@link withBaseConfig} method has to be used.
 */
const SassJestConfig = withBaseConfig(__dirname, {
  displayName: "SASS Unit Tests",
  /* Test environment that is required to properly run "sass-true" in a Jest environment.
     https://github.com/sass/dart-sass/issues/1692#issuecomment-1135536368 */
  testEnvironment: "jest-environment-node-single-context",
  /* Here, the actual SASS tests are being run by "sass-true" inside of the `scss.spec.ts` file,
     which uses a glob pattern to find the SASS test files inside of this directory.  We do not want
     to provide those files to Jest directly in the testMatch here, because Jest will try to run the
     SASS test files ('*.test.scss') directly, without "sass-true", and Jest alone cannot transform
     those files.

     For "sass-true" to work, we have to manually apply the package on SASS/SCSS test files - which
     is done inside of the 'scss.spec.ts' file.  This is the only file that Jest needs to be aware
     of, and when Jest runs the 'scss.spec.ts' file, it in turn will run "sass-true" across the
     '*.test.scss' files in the directory.  */
  testMatch: [`${__dirname}/scss.spec.ts`],
});

export default SassJestConfig;
