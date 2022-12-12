/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['src/**/*.{js,ts,jsx,tsx}', 'pages/**/*.{js,ts,jsx,tsx}'],
    plugins: [require('@tailwindcss/typography')],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
                mono: ['Consolas', ...defaultTheme.fontFamily.mono],
            },
        },
        fontFamily: {
            cal: ['Cal Sans', 'Inter var', 'sans-serif'],
        },
        textColor: {
            primary: 'var(--color-text-primary)',
            secondary: 'var(--color-text-secondary)',
            default: 'var(--color-text-default)',
            'default-soft': 'var(--color-text-default-soft)',
            inverse: 'var(--color-text-inverse)',
            'inverse-soft': 'var(--color-text-inverse-soft)',
        },
        backgroundColor: {
            primary: 'var(--color-bg-primary)',
            secondary: 'var(--color-bg-secondary)',
            default: 'var(--color-bg-default)',
            inverse: 'var(--color-bg-inverse)',
            'inverse-soft': 'var(--color-bg-inverse-soft)',
        },
        borderRadius: {
            none: '0',
            btn: 'var(--rounded-btn)',
            full: '9999px',
        },
        fontWeights: {
            normal: 'var(--font-weight-normal)',
            bold: 'var(--font-weight-bold)',
            display: 'var(--font-weight-display)',
            btn: 'var(--font-weight-btn)',
        },
        letterSpacing: {
            normal: '.5px',
        },
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
    // variants: {},
};
