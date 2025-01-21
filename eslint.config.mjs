import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import perfectionist from "eslint-plugin-perfectionist";
import pluginNext from "@next/eslint-plugin-next";
import parser from "@typescript-eslint/parser";

export default [
  perfectionist.configs["recommended-natural"],
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      parser,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
    plugins: {
      "@next/next": pluginNext,
    },
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    name: "ESLint Config - nextjs",
  },
];
