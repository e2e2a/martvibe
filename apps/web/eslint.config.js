import { nextJsConfig } from '@repo/eslint-config/next-js';

/** @type {import("eslint").Linter.Config} */
const config = {
  ...nextJsConfig,
  extends: ['next', 0],
  rules: {
    ...nextJsConfig.rules,
    'turbo/no-undeclared-env-vars': 'off',
  },
};

export default config;
