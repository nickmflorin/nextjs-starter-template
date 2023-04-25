# nextjs-starter-template

A starter template for NextJS & React projects that I typically use to quick start projects. You are
free to pick and choose the various aspects of this template that suit your needs - as the
configurations, setup and implementations might not be applicable to every use case.

This starter template incorporates the following:

#### Frameworks & Language

1. [NextJS][nextjs] - Proper configuration for a [NextJS][nextjs] in a [TypeScript][typescript]
   setting.
2. [React][react] - Proper configuration for [React][react] in a [NextJS][nextjs] and
   [TypeScript][typescript] setting.
3. [TypeScript][typescript]
4. [SASS][sass] - Proper configuration, setup and code architecture for incorporating [SASS][sass]
   into a [NextJS][nextjs] project.

The starter template includes a script that is run via
[`npm` pre-scripts](https://docs.npmjs.com/cli/v9/using-npm/scripts#pre--post-scripts) that ensures
that the version of [Node][node] being used matches the version defined in the `engines` property of
the `package.json` file. Using a [Node][node] version manager, such as [nvm][nvm], is recommended.

#### Testing

This template uses [Jest][jest] to support the application testing. The template includes proper
[Jest][jest] configuration in a [NextJS][nextjs] project. The configuration is broken down into
several "projects", each of which is responsible for testing a dedicated portion of the project:

- [jest-runner-eslint][jest-runner-eslint]: The ability to run [ESLint][eslint] checks on a project
  using [Jest][jest] with watch mode.
- [jest-runner-prettier][jest-runner-prettier]: The ability to run [Prettier][prettier] checks on a
  project using [Jest][jest] with watch mode.
- [jest-runner-stylelint][jest-runner-stylelint]: The ability to run [Stylelint][stylelint] checks
  on a project using [Jest][jest] with watch mode.
- Configuration for running snapshot tests on components using [Jest][jest] with watch mode.
- Configuration for using [@testing-library/react][testing-library-react] for running tests on
  components using [Jest][jest] with watch mode.
- [sass-true][sass-true]: Configuration that provides the ability to run SASS unit tests using the
  "sass-true" package.

#### Formatting & Code Style

The starter template incorporates configuration and base rules to operate the ensure standards and
patterns are consistent across the project without ambiguity. The linting configurations that are
incorporated are as follows:

1. [ESLint][eslint]: For enforcing consistency and code standards.
2. [Prettier][prettier]: For automatically formatting and standardizing code and documentation.
3. [Stylelint][stylelint]: For enforcing consistency and code standards in [SASS][sass] and CSS
   files.

You are free to omit, leave or alter rule configurations as you see fit - every team follows
different sets of patterns and you should feel free to adjust these rules to be consistency with
your team's conventions. It is important to note that many of the rules in this template were
established based on the following philosophy:

> There is usually not a right or wrong answer, but it is better to choose than to not.

In other words, many formatting rules were not chosen for a specific reason other than having a
decision. It is better to rely on the available formatting tools to remove as much ambiguity as
possible, rather than spending time debating or arguing the rules themselves. The rules present in
this configuration template were chosen such that there was as little ambiguity as possible - but
the values of the rules themselves are subjective.

##### IDE Consistency

In addition to the configurations for the linters themselves, this template also includes settings
and extensions for [VSCode][vscode] as well as supplemental configuration files (like
`.editorconfig` and `.prettierrc.yaml`) that are intended to prevent developer's local settings or
varying IDEs from clashing with the rules defined in the template.

As such, for certain rules, changing their values in `.eslintrc.js` should also be followed with
changes to `.vscode/settings.json`, `.editorconfig` and/or `.prettierrc.yaml` such that they are
consistent with the updated values in `.eslintrc.js`.

## Getting Started

This section of the documentation outlines - at a high level - how to setup your local machine and
your local environment to properly run and contribute to the application.

### System Requirements

- [nvm][nvm]
- [Node][node] v18

### Step 1: Repository

Clone this repository locally and `cd` into the directory.

```bash
$ git clone git@github.com:nickmflorin/nextjs-starter-template.git
```

### Step 2: Environment

After the repository is cloned, the next step is to setup your local development environment.

#### Step 2.a: Node

[Node][node] is the engine that supports the application. This project uses [Node][node] v18. To
install the correct version of [Node][node], we will use [nvm][nvm] - a [Node][node] version
manager.

**Important**: Do not use a system installation of [Node][node]. It will complicate your development
environment.

##### Step 2.a.i: NVM

We use [nvm][nvm] to manage [Node][node] versions. It allows us to isolate the version of
[Node][node] being used to the project directory, avoiding conflicts with global or system
installations of [Node][node].

Instructions for installing [nvm][nvm] can be found
[here](https://github.com/nvm-sh/nvm#installing-and-updating), but are also mentioned below for
purposes of completeness:

First, simply run the install script:

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

The above command will download a script and then run it. The script first clones the [nvm][nvm]
repository at `~/.nvm` and then attempts to add the following source lines to your machine's shell
profile script (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`):

```bash
$ export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

**Note**: _This installation will automatically make changes to your shell profile script. The exact
file will depend on the type of machine you are running as well as the period of time in which the
machine was created. Most likely, your shell profile script will be `~/.zshrc` - which is the shell
profile used for Mac's created since the introduction of the M1 processor._

Since the [nvm][nvm] installation involved making changes to your shell profile script behind the
scenes, in order for those changes to take effect you need to source your `~/.zshrc` (or whatever
shell script your system uses):

```bash
$ . ~/.zshrc`
```

Finally, verify that your system recognizes the `nvm` command by running the following:

```bash
$ nvm
```

##### Step 2.a.ii Node Version

We now need to establish the version of [Node][node], 18, that will be used for this project. This
project comes equipped with a `.nvmrc` file that automatically tells [nvm][nvm] what version of
[Node][node] to use - but that version may still need to be installed.

First, instruct [nvm][nvm] to use the [Node][node] version specified by the `.nvmrc` file with the
following command:

```bash
$ nvm use
```

If you see an output similar to the following:

```bash
Found '/<path-to-repository>/nextjs-starter-template/.nvmrc' with version <v18.0.0>
Now using node v18.0.0 (npm v8.6.0)
```

It means that the correct version of [Node][node] that is required for this project is already
installed with [nvm][nvm] and that version of [Node][node] is active for this project's directory.
The rest of this step can be skipped and you can proceed to the next step, "Dependencies".

On the other hand, if you see an error similar to the following:

```bash
Found '/<path-to-repository>/nextjs-starter-template/.nvmrc' with version <v18.0.0>
N/A: version "v18.0.0 -> N/A" is not yet installed.

You need to run "nvm install v18.0.0" to install it before using it.
```

It means that the correct version of [Node][node] that is required for this project is not already
installed with [nvm][nvm], and must be installed before using it. To do this, simply run the
following command:

```bash
$ nvm install
```

This command will use [nvm][nvm] to install the correct version of [Node][node] that is required for
this project, based on the specification in the project's `.nvmrc` file.

Finally, all that is left to do is to instruct [nvm][nvm] to use this version of [Node][node] by
executing the following command:

```bash
$ nvm use
```

For a sanity check, confirm that [nvm][nvm] is pointing to the correct version of [Node][node] in
the project directory by executing the following command:

```bash
$ nvm current
```

The output of this command should be similar to the following:

```bash
$ v18.x.x
```

At this point, if [nvm][nvm] is not pointing at the correct version of [Node][node] or is pointing
at a system installation of [Node][node], something went awry - consult a team member before
proceeding.

#### Step 2.b: Dependencies

When setting up the environment for the first time, you must do a fresh install of the dependencies:

```bash
$ npm install
```

This will install the project dependencies in the `package.json` file.

#### Step 2.c: ENV File

When running the application locally, there are two files that are used to define environment
variables that the application relies on:

1. `.env.local`
2. `.env.development`

The `.env.development` file is committed to source control, and its contents should not be changed
unless the intention is to commit the change to the application codebase. On the other hand,
`.env.local` is not committed to source control, and any environment variables placed in
`.env.local` will override those in `.env.development` (or `.env.production` if in a production
environment).

In certain cases you will need to create this `.env.local` file (in the project root) that defines
or overrides environment variables that the application relies on. In other cases, a `.env.local`
file will not be needed, as the environment variables defined in `.env.development` are suitable.

For environment variables that need to be specified in the `.env.local` file - if there are any -
please reach out to a team member when you reach this step. For more information, please refer to
the below section in this documentation, "Environment".

## Development

### IDE

This project is optimized for development using the [VSCode][vscode] IDE. While other IDEs may also
work in this repository, you must take steps to ensure that our editor configurations (like trimmed
whitespace, indentation, and `prettyprint` with [Prettier][prettier]) that are applied to this
repository while using [VSCode][vscode] are also consistently applied in your IDE. This ensures that
your commits will conform to the established repository style.

### Running Locally

After pulling down the latest state of the repository, the development server can be started by
running the following command:

```bash
$ npm run dev
```

**Note**: If changes were made to the `package.json` file, you may need to install the dependencies
via `npm install`.

Once the development server is running, you should start your work.

#### Building

Before committing any changes you have made, you must ensure that you validate your work by ensuring
that you can successfully build the project:

```bash
$ npm run build
```

This is required because [NextJS][nextjs] does not perform type checks while the development server
is running. Only the `build` command will compile the code and run all type checks.

Sometimes, you may get misleading results from the local build. For instance, you might notice that
the build is failing due to errors that you had just fixed, but were not picked up in the subsequent
build. This can happen because [NextJS][nextjs] will cache part of the build. To fix this, or as as
a general sanity-check, clear the cache before running the build:

```bash
$ rm -rf ./.next
$ npm run build
```

**Note**: [NextJS][nextjs] will also automatically perform linting checks during the `build`
process - any linting errors will result in the build failing automatically but linting warnings
will not. This includes linting performed by [ESLint][eslint], [Stylelint][stylelint] and
[Prettier][prettier].

#### Linting

This project uses [ESLint][eslint] to lint files that are not CSS or SCSS based,
[Stylelint][stylelint] to lint files that are CSS or SCSS based, and [Prettier][prettier] inside of
the [ESLint][eslint] configuration which will format and lint files of all types.

[NextJS][nextjs] will automatically perform linting checks during the `build` process, but it is
desired that they be performed independently without performing the entire `build` process, use the
following command:

```bash
$ npm run lint
```

This will run [ESLint][eslint], [Stylelint][stylelint] and [Prettier][prettier] on the project.

With that being said, the project's [Jest][jest] testing suite is configured to perform linting and
formatting checks via [ESLint][eslint], [Stylelint][stylelint] and [Prettier][prettier] as well.
This is the recommended way to perform the checks, because the output is much, much more suitable
for debugging and the hot reloading feature of [Jest][jest] will save you a lot of time.

This can be done simply as:

```bash
$ npm run test
```

##### Formatting & Code Style

The philosophy that the project has in regard to formatting and/or code styles can be summarized as
follows:

> There is usually not a right or wrong answer, but it is better to choose than to not.

In other words, many formatting rules were not chosen for a specific reason other than having a
decision. It is better to rely on the available formatting tools to remove as much ambiguity as
possible, rather than spending time debating or arguing the rules themselves.

[react]: https://reactjs.org/
[nvm]: https://github.com/nvm-sh/nvm
[node]: https://nodejs.org/en/
[nextjs]: https://nextjs.org/
[prettier]: https://prettier.io/
[vscode]: https://code.visualstudio.com/
[stylelint]: https://stylelint.io/
[eslint]: https://eslint.org/
[jest]: https://jestjs.io/docs/getting-started
[sass]: https://sass-lang.com/
[jest-runner-prettier]: https://github.com/keplersj/jest-runner-prettier
[typescript]: https://www.typescriptlang.org/
[jest-runner-eslint]: https://github.com/jest-community/jest-runner-eslint
[jest-runner-stylelint]: https://github.com/keplersj/jest-runner-stylelint
[testing-library-react]: https://testing-library.com/docs/react-testing-library/intro/
[sass-true]: https://github.com/oddbird/true
