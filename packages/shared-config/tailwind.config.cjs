const colors = require('tailwindcss/colors');

module.exports = {
    content: ['src/**/*.{js,ts,jsx,tsx}', 'pages/**/*.{js,ts,jsx,tsx}'],
    plugins: [require('daisyui')],
    theme: {
        extend: {
            colors: {
                inherit: colors.inherit,
                current: colors.current,
                transparent: colors.transparent,

                primary: 'var(--primary)',
                'primary-light': 'var(--primary-light)',
                secondary: 'var(--secondary)',
                inverse: 'var(--inverse)',
                'inverse-soft': 'var(--inverse-soft)',
                accent: 'var(--accent)',
                'accent-soft': 'var(--accent-soft)',

                dark: 'var(--dark)',
                'dark-soft': 'var(--dark-soft)',
                light: 'var(--light)',
                'light-soft': 'var(--light-soft)',
                error: 'var(--error)',
            },
            borderWidth: {
                DEFAULT: '1.5px',
            },
            borderColor: {
                DEFAULT: '#14a33d',
            },
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
    },
    daisyui: {
        styled: true,
        themes: [
            {
                cannabis: {
                    '--primary': '#14a33d',
                    '--primary-light': '#17c649',
                    '--secondary': '#13622a',
                    '--inverse': '#fff2da',
                    '--inverse-soft': '#f9f7f2',
                    '--accent': '#a49b8a',
                    '--accent-soft': '#bbb5a9',

                    '--dark': '#3e3a3a',
                    '--dark-soft': '#a8a8a8',

                    '--light': '#ffffff',
                    '--light-soft': '#c6c0b5',

                    '--error': '#dd1616',
                },
            },
        ],
    },
};
