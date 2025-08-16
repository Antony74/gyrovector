import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import noMixedOperators from 'eslint-plugin-no-mixed-operators';
import functional from 'eslint-plugin-functional';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        plugins: { js, noMixedOperators, functional },
        extends: ['js/recommended', 'functional/strict'],
    },
    tseslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            'noMixedOperators/no-mixed-operators': ['error'],
            'no-param-reassign': ['error'],
            'functional/functional-parameters': ['error'],
            'functional/no-promise-reject': ['error'],
            'functional/no-throw-statements': ['error'],
            'functional/no-try-statements': ['error'],
            'functional/immutable-data': ['error'],
            'functional/no-let': ['error'],
            'functional/prefer-immutable-types': ['error'],
            'functional/prefer-readonly-type': ['error'],
            'functional/type-declaration-immutability': ['error'],
            'functional/no-class-inheritance': ['error'],
            'functional/no-classes': ['error'],
            'functional/no-mixed-types': ['error'],
            'functional/no-this-expressions': ['error'],
            'functional/no-conditional-statements': ['error'],
            'functional/no-expression-statements': ['error'],
            'functional/no-loop-statements': ['error'],
            'functional/no-return-void': ['error'],
            'functional/prefer-property-signatures': ['error'],
            'functional/prefer-tacit': ['error'],
            'functional/readonly-type': ['error'],
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: { projectService: true },
        },
    },
]);
