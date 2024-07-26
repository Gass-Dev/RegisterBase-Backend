/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { args: "none" }],
      "no-console": "off",
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
  },
];
