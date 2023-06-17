import { Boarding } from "boarding.js";
import "boarding.js/styles/main.css";
import "boarding.js/styles/themes/basic.css";

const 
verifyPhotoIdTour = new Boarding({
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

verifyPhotoIdTour.defineSteps(
    [
        {
        element: '#verify-id-step-1',
        popover: {
            title: `Welcome to Gras!`,
            description: ''
        },
    },
    {
        element: '#verify-id-step-2',
        popover: {
            title: 'Please verify your id',
            description: 'It looks like this is your first time using <b>Gras</b>, so we need to verify your identity. ',
        },
    },
    {
        element: '#verify-id-step-3',
        popover: {
            title: 'Upload Photos of your ID',
            description: `Upload a picture of the front and back of your state drivers license or photo id card.`,
        },
    },
    {
        element: '#verify-id-step-4',
        popover: {
            title: `When you're ready, click Verify ID`,
            description: `Upload a picture of the front and back of your state's photo id card.`,
        },
    },
]);

function next () { verifyPhotoIdTour.next(); }
export { verifyPhotoIdTour };
