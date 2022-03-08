module.exports = {
  extends: 'airbnb-base',
  parser: '@typescript-eslint/parser',
  plugins: ['jest'],
  root: true,
  overrides: [{
    files: ['tests/**/*'],
    env: {
      'jest/globals': true,
    },
    rules: {
    },
  }],
};
