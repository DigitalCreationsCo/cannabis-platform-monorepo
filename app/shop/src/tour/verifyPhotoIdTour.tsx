import { Boarding } from 'boarding.js';
import 'boarding.js/styles/main.css';
import 'boarding.js/styles/themes/basic.css';

const verifyPhotoIdTour = new Boarding({
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

verifyPhotoIdTour.defineSteps([
	{
		element: '#verify-id-step-1',
		popover: {
			title: `<span style="color: #14a33d;">Welcome to Gras!</span>`,
			description:
				'<span style="color: #3e3a3a;">It looks like this is your first time using <b>Gras</b>, so we need to verify your identity.</span>',
		},
	},
	{
		element: '#verify-id-step-3',
		popover: {
			title: '<span style="color: #14a33d;">Upload Photos of your ID</span>',
			description: `<span style="color: #3e3a3a;">Upload a picture of the front and back of your state drivers license or photo id card.</span>`,
		},
	},
	{
		element: '#verify-id-step-4',
		popover: {
			title: `<span style="color: #14a33d;">When you're ready, click Verify ID</span>`,
			description: ``,
		},
	},
]);

export { verifyPhotoIdTour };
