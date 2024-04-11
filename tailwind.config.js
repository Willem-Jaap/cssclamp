/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                neutral: {
                    50: '#F1F3F5',
                    100: '#D1D3D6',
                    200: '#C2C8CD',
                    300: '#A6AEB6',
                    400: '#8A959F',
                    500: '#6F7B88',
                    600: '#58626C',
                    700: '#41484F',
                    800: '#2A2F33',
                    900: '#131517',
                    950: '#080809',
                },
                primary: {
                    50: '#FEE8F4',
                    100: '#FCC9E6',
                    200: '#F88AC9',
                    300: '#F44CAC',
                    400: '#EE0F8E',
                    500: '#B00B69',
                    600: '#8E0955',
                    700: '#6D0741',
                    800: '#4B052D',
                    900: '#2A0319',
                    950: '#200213',
                },
            },
            fontFamily: {
                sans: ['var(--font-sans)'],
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
