module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'default',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'objectLiteralProperty',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
      }
    ],
    '@typescript-eslint/explicit-member-accessibility': ['error', { 
      accessibility: 'explicit', 
      overrides: {
        constructors: 'no-public',
      },
    }],
    'max-len': ['error', { code: 120 , "ignorePattern": "^import\\W.*"}]
  },
  overrides: [
    {
      files: ['*.model.ts', '*.args.ts', '*.dto.ts'],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': 'off',
      },
    },
  ],
};
