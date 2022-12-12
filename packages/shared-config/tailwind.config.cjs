/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['src/**/*.{js,ts,jsx,tsx}', 'pages/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
                mono: ['Consolas', ...defaultTheme.fontFamily.mono],
            },
            typography: {
                DEFAULT: {
                    css: {
                        h1: {
                            fontFamily: 'Cal Sans',
                        },
                        h2: {
                            fontFamily: 'Cal Sans',
                        },
                        h3: {
                            fontFamily: 'Cal Sans',
                        },
                        'blockquote p:first-of-type::before': { content: 'none' },
                        'blockquote p:first-of-type::after': { content: 'none' },
                    },
                },
            },
        },
        fontFamily: {
            cal: ['Cal Sans', 'Inter var', 'sans-serif'],
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
