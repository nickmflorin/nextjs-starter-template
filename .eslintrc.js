const GENERIC_INTERNAL_MODULE_GROUP = ["application", "lib", "internal"];
const COMPONENT_INTERNAL_MODULE_GROUP = ["app", "components", "style"];
const INTERNAL_MODULES = [...GENERIC_INTERNAL_MODULE_GROUP, ...COMPONENT_INTERNAL_MODULE_GROUP];

const pathGroupPattern = packages =>
  `{${packages.reduce((prev, v) => [...prev, `${v}`, `${v}/**`], []).join(",")}}`;

const IMPORT_ORDER_CONFIG = {
  groups: ["builtin", "external", "type", "internal", "parent", "sibling", "index", "object"],
  "newlines-between": "always",
  warnOnUnassignedImports: true,
  distinctGroup: false,
  pathGroupsExcludedImportTypes: ["react", "next"],
  pathGroups: [
    {
      pattern: pathGroupPattern(["react", "next", "react-dom"]),
      group: "builtin",
      position: "before",
    },
    {
      pattern: "{../*}",
      group: "parent",
      position: "after",
    },
    {
      pattern: "{./*}",
      group: "sibling",
      position: "after",
    },
    {
      pattern: pathGroupPattern(GENERIC_INTERNAL_MODULE_GROUP),
      group: "internal",
      position: "before",
    },
    {
      pattern: pathGroupPattern(COMPONENT_INTERNAL_MODULE_GROUP),
      group: "internal",
      position: "before",
    },
  ],
  alphabetize: {
    order: "asc",
    caseInsensitive: true,
    orderImportKind: "asc",
  },
};

const RESTRICTED_IMPORT_PATTERNS = [
  {
    group: ["lib/*"],
    message: "Imports from lib must use namespaces.",
  },
  {
    group: ["internal/*"],
    message: "Imports from internal must use namespaces.",
  },
  {
    group: ["components/*/*"],
    message: "Components must be imported from modules.",
  },
  {
    group: ["application/*/*"],
    message: "Imports from application must be imported as modules.",
  },
  {
    /* Importing from root level modules with relative imports (i.e. "../components" or "../lib")
       is not allowed as it can lead to circular imports. */
    group: INTERNAL_MODULES.reduce((prev, v) => [...prev, `../${v}`, `../*/${v}`], []),
    message:
      "When outside of the module, absolute imports must be used to import from that module.",
  },
];

/* The non-language specific rules that apply to all files in the application, regardless of file
   type or language. */
const BASE_RULES = {
  "arrow-body-style": ["error", "as-needed"],
  curly: "error",
  "import/order": ["error", IMPORT_ORDER_CONFIG],
  "import/newline-after-import": ["error"],
  "import/no-duplicates": "error",
  "import/no-unresolved": "error",
  "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
  "max-len": [
    "warn",
    {
      code: 100,
      comments: 100,
      tabWidth: 2,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignorePattern: "\\/\\*\\s+eslint-disable-next-line(.?)+\\*\\/$",
    },
  ],
  "multiline-comment-style": ["warn", "bare-block"],
  "no-console": "error",
  "no-multiple-empty-lines": "error",
  "no-restricted-imports": ["error", { patterns: RESTRICTED_IMPORT_PATTERNS }],
  "no-unexpected-multiline": "error",
  "object-curly-spacing": [1, "always"],
  "prefer-const": "error",
  quotes: [1, "double"],
  semi: [1, "always"],
};

const TS_BASE_RULES = {
  ...BASE_RULES,
  /* The `no-explicit-any` rule sometimes does not play nicely with TS when trying to define general
     forms of types that require a generic type argument or array structures.  By specifying
     `ignoreRestArgs`, we can at least get it to play more nicely when spreading an arbitrary set of
     arguments that a function type can expect to receive. */
  "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
  /* The no-unused-vars rule does not properly function with Typescript so we need to disable it in
     favor of the @typescript-eslint version. */
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": ["error"],
  "react/jsx-newline": [1, { prevent: true }],
  "react/jsx-curly-brace-presence": [1, { props: "never", children: "never" }],
};

module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  rules: BASE_RULES,
  // The "!.*" is included such that ESLint doesn't (by default) ignore files that start with ".".
  ignorePatterns: ["next-env.d.ts", "!.*", "package.json", "package-lock.json"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      // "prettier" must always be last, and "next/core-web-vitals" must always be first.
      extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "prettier"],
      rules: TS_BASE_RULES,
    },
    {
      files: ["**/*.test.ts", "**/*.test.tsx", "**/tests/utils/*"],
      // "prettier" must always be last, and "next/core-web-vitals" must always be first.
      extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "prettier"],
      rules: {
        ...TS_BASE_RULES,
        // In tests, we need to use var-requires quite often when mocking.
        "@typescript-eslint/no-var-requires": 0,
        /* Importing from components or lib without using a namespace is often times necessary in
           tests because the test is testing a function or component that is not exported outside
           of the module in a namespace because it is not needed outside of the module.  */
        "no-restricted-imports": [
          "error",
          { patterns: [RESTRICTED_IMPORT_PATTERNS[RESTRICTED_IMPORT_PATTERNS.length - 1]] },
        ],
      },
    },
    {
      files: ["**/*.md"],
      extends: ["next/core-web-vitals", "prettier"],
      rules: {
        ...BASE_RULES,
        // Allow prettier to wrap Markdown files at the same line length as the code itself.
        "prettier/prose-wrap": "error",
      },
    },
  ],
};
