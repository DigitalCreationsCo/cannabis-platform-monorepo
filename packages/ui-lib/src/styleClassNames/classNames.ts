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
		'relative',
		'w-[240px] md:min-w-[340px] md:w-[340px] h-[220px] p-4 overflow-hidden !rounded',
	],
	infoCard: [
		'relative',
		'w-[200px] md:min-w-[224px] md:w-[340px] h-[200px] p-4 !rounded',
	],
	isOpenBadge: [
		'text-inverse border-2 tracking-wider z-5 top-0 right-0 p-3 m-3 badge absolute',
	],
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
			'z-50 sticky flex flex-row px-2 bg-inverse items-center shadow h-[50px] justify-between lg:pl-20 lg:pr-8',
		],
		tagline: [
			'pt-2 pl-2',
			'text-lg',
			'hidden',
			'md:block',
			'place-self-center',
			'text-primary font-semibold',
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
			'border border-transparent transition-10 hover:border hover:border-primary rounded-btn px-4 tracking-wide',
		],
	},
	FOOTER: {
		container:
			'cursor-default flex-col min-h-[188px] pt-10 px-4 bg-secondary min-w-full bottom-0 shadow-lg',
	},
	label_f: (justifyLabel: 'left' | 'center' | 'right' | undefined = 'left') => [
		'px-2',
		'w-full',
		justifyLabel && `text-${justifyLabel}`,
	],
	responsiveContainer: [
		'bg-inverse min-h-full h-full min-w-full sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12',
	],
	padd: 'md:pt-12 md:pb-14',
});

export default styles;
