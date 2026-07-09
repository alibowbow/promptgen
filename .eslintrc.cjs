module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['react-refresh', '@typescript-eslint'],
  settings: { react: { version: 'detect' } },
  ignorePatterns: [
    'dist',
    'node_modules',
    '*.config.js',
    '*.config.cjs',
    '*.config.ts',
  ],
  rules: {
    // The new JSX transform makes these unnecessary.
    'react-refresh/only-export-components': 'off',
    // `any` is used intentionally in a few boundary spots (untyped browser APIs,
    // loosely-typed API responses).
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'no-empty': ['error', { allowEmptyCatch: true }],
  },
};
