/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontSize: {
                'xs': ['clamp(0.625rem, 0.59rem + 0.133vw, 0.75rem)', { lineHeight: '1.33' }],
                'sm': ['clamp(0.75rem, 0.715rem + 0.133vw, 0.875rem)', { lineHeight: '1.33' }],
                'base': ['clamp(0.925rem, 0.904rem + 0.08vw, 1rem)', { lineHeight: '1.33' }],
                'lg': ['clamp(1rem, 0.965rem + 0.133vw, 1.125rem)', { lineHeight: '1.33' }],
                'xl': ['clamp(1.125rem, 1.09rem + 0.133vw, 1.25rem)', { lineHeight: '1.33' }],
                '2xl': ['clamp(1.25rem, 1.164rem + 0.332vw, 1.5625rem)', { lineHeight: '1.33' }],
                '3xl': ['clamp(1.375rem, 1.219rem + 0.598vw, 1.9375rem)', { lineHeight: '1.4' }],
                '4xl': ['clamp(1.5625rem, 1.32rem + 0.931vw, 2.4375rem)', { lineHeight: '1.4' }],
                '5xl': ['clamp(2rem, 1.723rem + 1.064vw, 3rem)', { lineHeight: '1.4' }],
                '6xl': ['clamp(2.625rem, 2.297rem + 1.263vw, 3.8125rem)', { lineHeight: '1.4' }],
            },
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
