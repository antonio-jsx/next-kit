import { fileURLToPath } from 'node:url';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import nextConfig from 'eslint-config-next';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import unusedImports from 'eslint-plugin-unused-imports';

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

export default defineConfig([
  ...nextConfig,
  eslintConfigPrettier,
  includeIgnoreFile(gitignorePath, { gitignoreResolution: true }),
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
        },
      ],
      'arrow-body-style': ['warn', 'as-needed'],
      'no-console': 'warn',
      'no-redeclare': 'warn',
      quotes: ['warn', 'single', { avoidEscape: true }],
      'react/display-name': 'error',
      'react/jsx-key': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'spaced-comment': 'warn',
    },
  },
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
]);
