import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  { ignores: ["dist/**"] },

  { plugins: { "@stylistic": stylistic } },

  {
    files: ["src/**/*.ts"],
    ignores: ["src/**/*.spec.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    extends: [
      ...tseslint.configs.stylisticTypeChecked,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    rules: {
      "@stylistic/quotes": ["error", "backtick", { avoidEscape: true }],
      "sort-imports": ["error"],
      curly: ["error", "all"],
      "@stylistic/curly-newline": ["error", "always"],
      "@stylistic/keyword-spacing": ["error", { before: true, after: true }],
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: false }],
      "@stylistic/indent": ["error", 4],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/no-extra-semi": ["error"],
      "@stylistic/space-in-parens": ["error", "never"],
      "@stylistic/array-element-newline": ["error", "consistent"],
      "@stylistic/object-property-newline": ["error"],
      "@stylistic/newline-per-chained-call": [
        "error",
        { ignoreChainWithDepth: 1 },
      ],
      "@stylistic/comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "always-multiline",
          enums: "always-multiline",
          tuples: "always-multiline",
        },
      ],
      "@stylistic/semi-spacing": [
        "error",
        {
          before: false,
          after: true,
        },
      ],
      "@stylistic/no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 0,
        },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
]);
