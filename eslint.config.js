import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'node_modules/**',
      '.github/**',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
    },
  },

  {
    files: ['eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  prettier,
];