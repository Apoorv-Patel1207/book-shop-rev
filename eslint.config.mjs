import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      eqeqeq: "error", // Enforce the use of === and !==
      "no-console": "warn", // Warn about console.log statements
      "no-unused-vars": "warn", // Warn about unused variables
      indent: ["error", 2], // Enforce 2-space indentation
      "arrow-parens": ["error", "always"], // Require parentheses around arrow function arguments
    },
  },
];
