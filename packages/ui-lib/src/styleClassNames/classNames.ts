const styles = Object.freeze({
	gradient_f: (color1: string, color2: string) => [
		'bg-gradient-to-b',
		`from-${color1}`,
		`to-${color2}`,
		'md:pt-16',
	],
	about: [
		'bg-inverse text-dark opacity-90 sm:rounded ',
		'space-y-2',
		'mx-auto lg:mx-16',
		'cursor-default w-full sm:max-w-[440px] grow h-fit py-4 pb-8 px-8 items-center shadow',
	],
	floatingCard: [
		'transition duration-200',
		'hover:scale-102',
		'hover:-translate-y-1',
	],
	dispensaryCard: [
		'relative',
		'block',
		'rounded',
		'sm:pt-5 md:py-5 px-5 md:px-12',
		'overflow-hidden',
		'shadow min-h-[220px]',
		// 'border border-transparent hover:border-primary',
	],
	eventCard: [
		'relative',
		'block',
		'rounded',
		'h-[190px]',
		// 'sm:max-w-[320px]',
		// 'w-full',
		'overflow-hidden',
	],
	infoCard: [
		'relative',
		'block',
		'flex flex-col',
		'bg-cyan-950',
		'text-light',
		'h-[240px]',
		'rounded',
		'overflow-hidden',
	],
	isOpenBadge: [
		'text-inherit border-b border-light tracking-wider inline-block text-sm z-10 top-0 right-0',
	],
	HERO: {
		container: ['w-full p-4 md:px-14 lg:px-32', 'justify-center'],
		content: [
			'mx-auto',
			'flex-col md:flex-row items-center',
			'space-y-4 md:space-x-8',
		],
		responsiveHeading: ['text-3xl sm:text-4xl whitespace-normal'],
		heading:
			'tracking-tight text-center inline-block whitespace-pre-line font-semibold text-secondary-light text-4xl lg:text-5xl xl:text-6xl',
		largeHeading:
			'bg-clip-text text-transparent bg-gradient-to-b from-secondary-light to-primary-light inline whitespace-pre-line text-6xl lg:text-7xl lg:text-8xl xl:text-8xl font-bold',
	},
	TOPBAR: {
		topbar: [
			'h-14',
			'z-50 sticky flex flex-row bg-inverse-soft items-center shrink-0 justify-between space-x-5',
			'py-2 px-4',
			// 'border border-secondary',
		],
		tagline: [
			'p-0 m-0',
			'text-md',
			// 'hidden',
			'md:block',
			'place-self-center',
			'font-semibold',
		],
		badge: [
			'indicator absolute inline-flex items-center justify-center w-6 h-6 text-sm text-light bg-primary -top-2 -right-2 rounded-full',
		],
	},
	BUTTON: {
		round_image_btn: [
			'btn focus:!border-primary focus:!ring-primary focus:!outline-primary h-32 w-32 col-span-1 !rounded-full p-0 m-0 overflow-hidden',
		],
		highlight: [
			'border border-transparent transition hover:border hover:border-primary rounded-btn px-4 py-1 tracking-wide text-lg',
		],
	},
	FOOTER: {
		container:
			'cursor-default flex-col min-h-[188px] bg-secondary px-12 pt-0 md:pt-12 min-w-full bottom-0 shadow-lg pb-[120px]',
	},
	label_f: (justifyLabel: 'left' | 'center' | 'right' | undefined = 'left') => [
		'flex',
		'justify-between',
		'px-2 py-1',
		'w-full',
		justifyLabel && `text-${justifyLabel}`,
	],
	responsiveContainer: [
		'bg-inverse min-h-full h-full min-w-full sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12',
	],
	padd: 'md:pt-12 md:pb-14',
	shadow: {
		textShadow: 'drop-shadow-[0px_2px_.75px_#555555]',
		textShadowLg:
			'drop-shadow-[0px_2px_.75px_#555555] md:drop-shadow-[1px_3px_1px_#555555]',
		// 'drop-shadow-[1px_2px_1px_#555555] md:drop-shadow-[0px_2px_1px_#555555]'
		logoShadow: 'drop-shadow-[0px_2.5px_1.2px_#555555]',
	},
});

export default styles;
