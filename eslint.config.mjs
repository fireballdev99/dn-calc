import { defineConfig } from "eslint";
import tsParser from "@typescript-eslint/parser";
import typescript from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import next from "@next/eslint-plugin-next";

export default defineConfig([
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                sourceType: "module",
                project: "./tsconfig.json",
            },
            ecmaVersion: "latest",
        },
        plugins: {
            "@typescript-eslint": typescript,
            react,
            "react-hooks": reactHooks,
            "@next/next": next,
        },
        rules: {
            // ✅ แนะนำทั่วไป
            "no-console": "warn",
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "@typescript-eslint/no-unused-vars": ["warn", {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
            }],
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
]);
