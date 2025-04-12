module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        "semi": ["error", "always"],         // will fix missing semicolons
        "quotes": ["error", "double"],       // will fix single → double quotes
        "no-unused-vars": "warn",            // won't auto-fix, just warn
      }
  };