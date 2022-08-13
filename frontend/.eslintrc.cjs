module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "plugin:react/recommended",
    "eslint:recommended",
    "standard",
    "plugin:react/jsx-runtime"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "react",
    "@typescript-eslint"
  ],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
