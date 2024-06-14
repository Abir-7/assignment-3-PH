import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      'no-var': 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-console': 'warn',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
    },
    ignores: ['**/node_modules/', '.dist/'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
