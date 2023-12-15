/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                neutral: {
                    50: '#F3F3F4',
                    100: '#E4E4E7',
                    200: '#C7C7CC',
                    300: '#A9A9B1',
                    400: '#8C8C97',
                    500: '#6F6F7B',
                    600: '#55555E',
                    700: '#333340',
                    800: '#191924',
                    900: '#0E0E14',
                    950: '#07070A',
                },
                primary: {
                    50: '#E7E3FF',
                    100: '#DAD3F8',
                    200: '#C0B4F4',
                    300: '#A895EF',
                    400: '#9176EB',
                    500: '#7B57E6',
                    600: '#5C2BDF',
                    700: '#4A1CBB',
                    800: '#3B158F',
                    900: '#2A0F62',
                    950: '#210B4C',
                },
            },
            fontFamily: {
                sans: ['var(--font-satoshi)'],
                mono: ['var(--font-roboto-mono)'],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
