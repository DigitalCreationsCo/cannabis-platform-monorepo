import { Boarding } from "boarding.js";
import "boarding.js/styles/main.css";
import "boarding.js/styles/themes/basic.css";

const 
userSignUpTour = new Boarding({
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
    }
})

userSignUpTour.defineSteps(
    [
        {
        element: '#user-signup-step-1',
        popover: {
            title: `Let's get your contact info.`,
            description: ''
        },
    },
    {
        element: '#user-signup-step-2',
        popover: {
            title: 'Fill out the fields to create your account.',
            description: 'It looks like this is your first time using <b>Gras</b>, so we need to verify your identity. ',
        },
    },
    {
        element: '#user-signup-step-3',
        popover: {
            title: `When you're ready, click Next.`,
            description: ``,
        },
    },
]);

export { userSignUpTour };
