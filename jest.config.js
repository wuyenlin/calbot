module.exports = {
  testMatch: ['**/tests/**/*.spec.[t]s?(x)'],
  testPathIgnorePatterns: ['./node_modules', './dist'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageDirectory: './coverage/unit',
  coverageReporters: ['json', 'cobertura', 'text', 'lcov'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  reporters: ['default'],
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts',
    '!./src/index.ts',
    '!./src/types/**/*.ts',
    '!./src/config/**/*.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
