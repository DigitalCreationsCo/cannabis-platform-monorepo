import { TextContent } from '@cd/core-lib';
import { Boarding } from 'boarding.js';
import 'boarding.js/styles/main.css';
import 'boarding.js/styles/themes/basic.css';

const userSignUpTour = new Boarding({
	animate: true,
	opacity: 0.25,
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

userSignUpTour.defineSteps([
	{
		element: '#user-signup-step-1',
		popover: {
			title: TextContent.account.CREATE_YOUR_ACCOUNT,
			description: '',
		},
	},
	{
		element: '#user-signup-step-2',
		popover: {
			title: `Fill out the fields to create your account.`,
			description: '',
		},
	},
	{
		element: '#avatar-button-0',
		popover: {
			title: TextContent.account.CHOOSE_PROFILE_PICTURE,
			description: '',
		},
	},
	{
		element: '#user-signup-step-3',
		popover: {
			title: `Choose a username. Make it unique!`,
			description: ``,
		},
	},
	{
		element: '#user-signup-step-4',
		popover: {
			title: `Please read the Gras Terms and Conditions policy.`,
			description: ``,
		},
	},
	{
		element: '#user-signup-step-5',
		popover: {
			title: `When you're ready, click Next.`,
			description: ``,
		},
	},
]);

export { userSignUpTour };
