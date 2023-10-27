import { Boarding } from 'boarding.js';
import 'boarding.js/styles/main.css';
import 'boarding.js/styles/themes/basic.css';

const shopTour = new Boarding({
	animate: true,
	opacity: 0.25,
	allowClose: true,
	overlayClickNext: true,
	closeBtnText: 'Okay',
	nextBtnText: '',
	showButtons: false,
	scrollIntoViewOptions: {
		behavior: 'smooth',
	},
	onReset: () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	},
});
const tourSteps = [
	{
		element: '#shop-tour-step1',
		popover: {
			title: `<span style="font-size: 30px; color: #14a33d;">Welcome to Gras</span>`,
			description: '',
		},
	},
	{
		element: '#shop-tour-step2',
		popover: {
			title: `<span style="font-size: 30px; color: #14a33d;">Order delivery from your favorite dispensaries.</span>`,
			description: '',
		},
	},
];
shopTour.defineSteps(tourSteps);

export { shopTour };
