const GENERAL_ROOT_MODULES = ["application", "lib", "internal"];
/* Imports from component and component related root level modules are in a separate group from
   other root level modules. */
const COMPONENT_ROOT_MODULES = ["components", "style", "pages"];
const INTERNAL_MODULES = [...GENERAL_ROOT_MODULES, ...COMPONENT_ROOT_MODULES];

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
      pattern: pathGroupPattern(GENERAL_ROOT_MODULES),
      group: "internal",
      position: "before",
    },
    {
      pattern: pathGroupPattern(COMPONENT_ROOT_MODULES),
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

/* A restricted import pattern that prevents relative imports modules at the src root while outside
   of that module. */
const NO_RELATIVE_IMPORT_FROM_MODULE_PATTERN = {
  /* Importing from root level modules with relative imports (i.e. "../components" or "../lib")
     is not allowed as it can lead to circular imports. */
  group: INTERNAL_MODULES.reduce((prev, v) => [...prev, `../${v}`, `../*/${v}`], []),
  message: "When outside of the module, absolute imports must be used to import from that module.",
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
  NO_RELATIVE_IMPORT_FROM_MODULE_PATTERN,
];

/* The non-language specific rules that apply to all files in the application, regardless of file
   type or language. */
const BASE_RULES = {
  // The "error" severity is required to allow "prettier" to auto-format the code and fix the rule.
  "arrow-body-style": ["error", "as-needed"],
  // The "error" severity is required to allow "prettier" to auto-format the code and fix the rule.
  curly: "error",
  // The "error" severity is required to allow "prettier" to auto-format the code and fix the rule.
  "import/order": ["error", IMPORT_ORDER_CONFIG],
  "import/newline-after-import": ["error"],
  // The "error" severity is required to allow "prettier" to auto-format the code and fix the rule.
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
  // The "error" severity is required to allow "prettier" to auto-format the code and fix the rule.
  "no-multiple-empty-lines": "error",
  "no-restricted-imports": ["error", { patterns: RESTRICTED_IMPORT_PATTERNS }],
  // The "error" severity is required to allow "prettier" to auto-format the code and fix the rule.
  "no-unexpected-multiline": "error",
  "object-curly-spacing": [1, "always"],
  // The "error" severity is required to allow "prettier" to auto-format the code and fix the rule.
  "prefer-const": "error",
  quotes: [1, "double"],
  semi: [1, "always"],
};

// The base rule set that should be used for '.ts' or '.tsx' files.
const TS_BASE_RULES = {
  ...BASE_RULES,
  /* The `no-explicit-any` rule does not play nicely with TypeScript when defining general forms of
     function or array types that require generic spread type arguments.  Specifying the
     'ignoreRestArgs' rule alleviates the problem to some degree, but does not introduce type safety
     concerns. */
  "@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
  /* In TypeScript projects, the root "no-unused-vars" rule does not work properly with types, and
     sometimes clashes with the "@typescript-eslint" version of the rule.  The "@typescript-eslint"
     version covers all the cases that the root "no-unused-vars" rule does, but works properly with
     types - so it is used in favor of the root "no-unused-vars" rule, not in conjunction with. */
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": ["error"],
  "react/jsx-newline": [1, { prevent: true }],
  "react/jsx-curly-brace-presence": [1, { props: "never", children: "never" }],
};

module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  rules: BASE_RULES,
  /* The "!.*" is included such that ESLint doesn't (by default) ignore files that start with ".".
     Machine generated files should not be linted or auto-formatted - so they should be added to
     this list. */
  ignorePatterns: ["next-env.d.ts", "!.*", "package.json", "package-lock.json"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      // "prettier" must always be last, and "next/core-web-vitals" must always be first.
      extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "prettier"],
      rules: TS_BASE_RULES,
    },
    {
      files: ["**/*.test.ts", "**/*.test.tsx"],
      // "prettier" must always be last, and "next/core-web-vitals" must always be first.
      extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "prettier"],
      rules: {
        ...TS_BASE_RULES,
        // In tests, var-requires are often required when mocking modules or packages.
        "@typescript-eslint/no-var-requires": 0,
        /* Importing from files directly, without using a namespace, is often necessary in tests
           because the test may be testing a function, component or piece of logic that is not
           exported outside of the namespace. */
        "no-restricted-imports": ["error", { patterns: [NO_RELATIVE_IMPORT_FROM_MODULE_PATTERN] }],
      },
    },
    {
      files: ["**/*.md"],
      extends: ["prettier"],
      rules: {
        ...BASE_RULES,
        // Allow prettier to wrap Markdown files at the same line length as the code itself.
        "prettier/prose-wrap": "error",
      },
    },
  ],
};
