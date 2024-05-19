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
	dispensaryCard: [
		'border',
		'relative',
		// 'mx-4 my-8 sm:pt-4 pb-12 md:py-5 px-4 md:px-12',
		'mx-3 my-3 sm:pt-4 md:py-5 px-4 md:px-12',
		'rounded-btn shadow h-[220px]',
		'drop-shadow-[-6px_4px_1px_#455555]',
	],
	infoCard: [
		'relative',
		'w-[200px] md:min-w-[224px] md:w-[340px] h-[200px] p-4 !rounded',
	],
	isOpenBadge: ['text-inherit border-b tracking-wider z-10 top-0 right-0'],
	HERO: {
		container: ['w-full p-4 md:px-14 lg:px-32', 'justify-center'],
		content: [
			'mx-auto',
			'flex-col md:flex-row items-center',
			'space-y-4 md:space-x-8',
		],
		responsiveHeading: ['text-3xl sm:text-4xl whitespace-normal'],
	},
	TOPBAR: {
		topbar: [
			'z-50 sticky flex flex-row bg-inverse-soft items-center min-h-[40px] shrink-0 justify-between space-x-5',
			'py-2 px-2',
		],
		tagline: [
			'p-0 m-0',
			'text-md',
			'hidden',
			'md:block',
			'place-self-center',
			'text-primary',
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
			'cursor-default flex-col min-h-[188px] bg-secondary p-10 min-w-full bottom-0 shadow-lg pb-[120px]',
	},
	label_f: (justifyLabel: 'left' | 'center' | 'right' | undefined = 'left') => [
		'px-2 py-1',
		'w-full',
		justifyLabel && `text-${justifyLabel}`,
	],
	responsiveContainer: [
		'bg-inverse min-h-full h-full min-w-full sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12',
	],
	padd: 'md:pt-12 md:pb-14',
	textShadow: 'drop-shadow-[0px_3px_1px_#a8a8a8]',
	textShadowLg: 'drop-shadow-[0px_10px_10px_#a8a8a8]',
});

export default styles;
