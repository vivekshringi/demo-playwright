import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import pluginJs from '@eslint/js';
import tseslint, { parser } from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: tseslint/parser,
      parserOptions: {
        project: './tsconfig.json', // Point to your tsconfig.json
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    }, // Use the TypeScript parser
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      ...pluginPrettier.configs.recommended.rules, // Use Prettier recommended rules
      'prettier/prettier': 'error', // Treat Prettier issues as ESLint errors
    },
  },
  { files: ['**/*.{js,mjs,cjs,ts}'], languageOptions: { sourceType: 'commonjs' } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': 'off', // Disable the rule here as well
    },
  },
  configPrettier,
  {
    ignores: ['node_modules/', 'output', '.env'],
  },
];
