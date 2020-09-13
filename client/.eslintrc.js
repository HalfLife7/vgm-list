module.exports = {
  root: true,

  env: {
    es6: true,
    node: true,
  },

  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "prettier",
    "prettier/vue",
  ],
  plugins: ["vue"],

  parserOptions: {
    parser: "babel-eslint",
  },

  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "no-deprecated-slot-attribute": "off"
  },
};
