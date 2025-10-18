/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ["next/core-web-vitals"],
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "warn",
    "react/no-unescaped-entities": "warn",
  },
};

export default config;