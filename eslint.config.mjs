import { fileURLToPath } from 'node:url';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import nextConfig from 'eslint-config-next';
import eslintConfigPrettier from 'eslint-config-prettier';

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

export default defineConfig([
  includeIgnoreFile(gitignorePath, { gitignoreResolution: true }),
  ...nextConfig,
  eslintConfigPrettier,
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
]);
