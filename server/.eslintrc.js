module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  ignorePatterns: ['dist-server/*', 'models/*'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    strict: 0,
  },
};
