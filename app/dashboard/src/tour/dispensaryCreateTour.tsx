import { TextContent } from '@cd/core-lib';
import { Boarding } from 'boarding.js';
import 'boarding.js/styles/main.css';
import 'boarding.js/styles/themes/basic.css';

const dispensaryCreateTour = new Boarding({
	animate: true,
	opacity: 0.15,
	allowClose: false,
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

dispensaryCreateTour.defineSteps([
	{
		element: '#dispensary-create-step-1',
		popover: {
			title: 'Welcome to Gras',
			description: '',
		},
	},
	{
		element: '#dispensary-create-step-2',
		popover: {
			title: `Create A Dispensary Account`,
			description:
				'Fill out this quick form to create your Dispensary account.',
		},
	},
	{
		element: '#dispensary-create-step-3',
		popover: {
			title: TextContent.legal.READ_DISPENSARY_TERMS_OF_SERVICE,
			description: '',
		},
	},
	{
		element: '#dispensary-create-step-4',
		popover: {
			title: TextContent.prompt.CONTINUE,
			description: ``,
		},
	},
]);

export { dispensaryCreateTour };
