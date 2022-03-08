import { resolve } from 'path';

export default {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    'src/(.*)': resolve('src/$1'),
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
};
