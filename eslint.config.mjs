import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginPrettier.configs.recommended.rules, // Use Prettier recommended rules
      "prettier/prettier": "warn", // Treat Prettier issues as ESLint errors
    },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  playwright.configs["flat/recommended"],
  configPrettier,
  {
    ignores: ["node_modules/", "output", ".env"],
  },
];
