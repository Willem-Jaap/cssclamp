// @ts-check
/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
    // @ts-ignore
    ...require('eslint-config-pixel/prettier/base'),
    plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
    tailwindFunctions: ['cn'],
    importOrder: [
        '^react$',
        '^next$',
        '<THIRD_PARTY_MODULES>',
        '',
        '^~/components/(.*)$',
        '^~/actions/(.*)$',
        '^~/hooks/(.*)$',
        '^~/utils/(.*)$',
        '^~/styles/(.*)$',
        '',
        '^~/app/(.*)$',
        '^~(.*)$',
        '',
        '^~/types/(.*)$',
        '^[./]',
    ],
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
    importOrderTypeScriptVersion: '5.0.0',
};
