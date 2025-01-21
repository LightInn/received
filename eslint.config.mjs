import pluginNext from "@next/eslint-plugin-next";
import pluginQuery from "@tanstack/eslint-plugin-query";
import parser from "@typescript-eslint/parser";
import perfectionist from "eslint-plugin-perfectionist";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginPromise from "eslint-plugin-promise";
import woke from "eslint-plugin-woke";

export default [
  perfectionist.configs["recommended-natural"],
  eslintPluginPrettierRecommended,
  ...pluginQuery.configs["flat/recommended"],
  pluginPromise.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      woke,
    },
    rules: {
      "woke/all": 2,
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    name: "ESLint Config - nextjs",
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
];
