/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['src/**/*.{js,ts,jsx,tsx}', 'pages/**/*.{js,ts,jsx,tsx}'],
    plugins: [
        require('@tailwindcss/typography'),
        // require('daisyui')
    ],
    // daisyui: {
    //     styled: true,
    //     themes: false,
    // },
    theme: {
        extend: {
            textColor: {
                DEFAULT: 'var(--color-dark)',
            },
            borderColor: {
                DEFAULT: 'var(--color-primary)',
            },
            borderWidth: {
                DEFAULT: '1.5px',
            },
            //     fontFamily: {
            //         sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            //         mono: ['Consolas', ...defaultTheme.fontFamily.mono],
            //     },
        },
        colors: ({ colors }) => ({
            inherit: colors.inherit,
            current: colors.current,
            transparent: colors.transparent,
            primary: 'var(--color-primary)',
            'primary-light': 'var(--color-primary-light)',
            secondary: 'var(--color-secondary)',
            inverse: 'var(--color-inverse)',
            'inverse-soft': 'var(--color-inverse-soft)',
            accent: 'var(--color-accent)',
            'accent-soft': 'var(--color-accent-soft)',
            dark: 'var(--color-dark)',
            'dark-soft': 'var(--color-dark-soft)',
            light: 'var(--color-light)',
            'light-soft': 'var(--color-light-soft)',
            error: 'var(--color-error)',
        }),
        // fontFamily: ({ theme }) => ({
        //     sans: ['Cal Sans', 'Inter var', theme('fontFamily.sans.ui-sans-serif')],
        //     mono: ['Consolas', theme('fontFamily.mono.ui-monospace')],
        // }),
        borderRadius: {
            none: '0',
            btn: 'var(--rounded-btn)',
            full: '9999px',
        },
        fontWeight: {
            normal: 'var(--font-weight-normal)',
            semibold: 'var(--font-weight-semibold)',
            bold: 'var(--font-weight-bold)',
            display: 'var(--font-weight-display)',
            btn: 'var(--font-weight-btn)',
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
            },
        },
    },
};
