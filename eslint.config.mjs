import js from '@eslint/js';
import next from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['.next/**', 'next-env.d.ts'],
    },
    js.configs.recommended,
    tseslint.configs.strictTypeChecked,
    // Bundles the @next/next, react, react-hooks, jsx-a11y and import plugins.
    ...next,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            react: { version: 'detect' },
        },
        rules: {
            '@typescript-eslint/consistent-type-imports': 'warn',
            // Interpolating numbers into strings is intentional throughout the
            // clamp maths; only genuinely unsafe types should be flagged.
            '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
            '@typescript-eslint/no-misused-promises': [
                'error',
                { checksVoidReturn: { attributes: false } },
            ],
            'react/function-component-definition': [
                'error',
                { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
            ],
            'react/hook-use-state': 'warn',
            'react/self-closing-comp': ['warn', { component: true, html: true }],
            'react/react-in-jsx-scope': 'off',
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['./*'],
                            message:
                                'Please use absolute imports instead. Take a look at the paths in tsconfig.json for available options.',
                        },
                    ],
                },
            ],
        },
    },
    // Config files are Node scripts outside the app's TypeScript program, so
    // type-aware rules cannot run against them.
    {
        files: ['**/*.config.{js,mjs,cjs}'],
        extends: [tseslint.configs.disableTypeChecked],
        languageOptions: {
            globals: { module: 'writable', require: 'readonly' },
        },
        rules: {
            '@typescript-eslint/consistent-type-imports': 'off',
        },
    },
    prettier,
);
