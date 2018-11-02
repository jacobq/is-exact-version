const { resolve } = require('path');

module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    'src/(.*)': resolve('src/$1'),
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
};
