/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	content: {
		relative: true,
		files: [
			'./src/**/*.{js,jsx,ts,tsx}',
			'../../node_modules/daisyui/dist/**/*.js',
			'../../node_modules/react-daisyui/dist/**/*.js',
		],
	},
	theme: {
		fontFamily: {
			encode: ['Encode Sans', 'sans-serif'],
			onest: ['Onest', 'sans-serif'],
			gras: ['Gras', 'sans-serif'],
		},
		extend: {
			keyframes: {
				gradient: {
					'0%': {
						'background-position': '0% 50%',
					},
					'50%': {
						'background-position': '100% 50%',
					},
					'100%': {
						'background-position': '0% 50%',
					},
				},
			},
			animation: {
				gradient: 'gradient 32s ease-in-out infinite',
			},
			colors: {
				inherit: colors.inherit,
				current: colors.current,
				transparent: colors.transparent,

				primary: 'var(--primary)',
				'primary-light': 'var(--primary-light)',
				secondary: 'var(--secondary)',
				'secondary-light': 'var(--secondary-light)',
				inverse: 'var(--inverse)',
				'inverse-soft': 'var(--inverse-soft)',
				accent: 'var(--accent)',
				'accent-soft': 'var(--accent-soft)',

				dark: 'var(--dark)',
				'dark-soft': 'var(--dark-soft)',
				light: 'var(--light)',
				'light-soft': 'var(--light-soft)',
				error: 'var(--error)',
				yellow: 'var(--yellow)',
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
			scale: {
				1005: '1.005',
				101: '1.01',
				102: '1.02',
			},
			transitionDuration: {
				2000: '2000ms',
				3000: '3000ms',
			},
		},
	},
	daisyui: {
		styled: true,
		base: true,
		utils: true,
		themes: [
			{
				cannabis: {
					'--primary': '#14a33d',
					'--primary-light': '#17c649',
					'--secondary': '#13622a',
					'--secondary-light': '#4BBE6E',
					'--inverse': '#fff2da',
					'--inverse-soft': '#f9f7f2',
					'--accent': '#a49b8a',
					'--accent-soft': '#bbb5a9',

					'--dark': '#3e3a3a',
					'--dark-soft': '#a8a8a8',

					'--light': '#ffffff',
					'--light-soft': '#c6c0b5',

					'--error': '#dd1616',

					'--yellow': '#FFF244',
				},
			},
		],
	},
};
