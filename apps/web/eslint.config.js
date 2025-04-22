import { nextJsConfig } from '@repo/eslint-config/next-js';

/** @type {import("eslint").Linter.Config} */
const config = {
  ...nextJsConfig,
  rules: {
    ...nextJsConfig.rules,
    'turbo/no-undeclared-env-vars': 'off',
  },
};

export default config;
