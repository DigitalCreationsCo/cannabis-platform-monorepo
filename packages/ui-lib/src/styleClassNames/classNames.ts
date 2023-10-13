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
	HERO: {
		container: [
			'w-full pt-4 pb-6 md:pt-4 px-4 md:px-14 lg:px-32',
			'justify-center',
		],
		content: [
			'mx-auto',
			'flex-col md:flex-row items-start',
			'space-y-4 md:space-x-8',
		],
		responsiveHeading: [
			'text-2xl md:text-4xl pb-0 whitespace-normal font-semi-bold',
		],
	},
	TOPBAR: {
		topbar: [
			'z-100 z-50 sticky flex flex-row px-2 bg-inverse items-center shadow h-[50px] justify-between lg:px-20',
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
			'border border-transparent transition-10 hover:border hover:border-primary rounded-btn px-4',
		],
	},
	FOOTER: {
		container:
			'cursor-default flex-col min-h-[188px] pt-10 px-4 pb-24 bg-secondary min-w-full bottom-0 shadow-lg',
	},
});

export default styles;
