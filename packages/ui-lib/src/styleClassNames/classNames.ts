const styles = Object.freeze({
	about: [
		'bg-inverse opacity-90 md:rounded ',
		'space-y-2',
		'mx-auto',
		'cursor-default w-full md:max-w-[440px] h-fit p-8 items-center shadow',
	],
	HERO: {
		container: [
			'w-full pt-4 pb-6 md:pt-4 px-4 md:px-14 lg:px-32',
			'justify-center',
			'opacity-90',
			'anim8-green-gradient',
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
		topbar: ['flex flex-row px-2 bg-inverse items-center shadow z-10 h-[50px]'],
		tagline: [
			'pt-2 pl-2',
			'text-lg',
			'hidden',
			'md:block',
			'place-self-center',
			'text-primary font-semibold',
			'cursor-default',
			'md:cursor-default',
		],
		badge: [
			'indicator absolute inline-flex items-center justify-center w-6 h-6 text-sm text-light bg-primary -top-2 -right-2 rounded-full',
		],
	},
	BUTTON: {
		round_image_btn: [
			'btn focus:!border-primary focus:!ring-primary focus:!outline-primary h-32 w-32 col-span-1 !rounded-full p-0 m-0 overflow-hidden',
		],
		highlight: ['border border-transparent hover:border hover:border-primary'],
	},
	FOOTER: {
		container:
			'cursor-default flex-col min-h-[188px] p-8 pb-24 bg-secondary min-w-full bottom-0 shadow-lg',
	},
});

export default styles;
