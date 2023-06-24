import { Boarding } from "boarding.js";
import "boarding.js/styles/main.css";
import "boarding.js/styles/themes/basic.css";

const submitAddressTour = new Boarding({
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
});

const tourSteps = [
  {
    element: '#submit-address-step-1',
    popover: {
      title: 'Tell us where you want your order delivered.',
      description: '',
    },
  },
  {
    element: '#submit-address-step-2',
    popover: {
      title: `When you're ready, click Next.`,
      description: '',
    },
  },
];
submitAddressTour.defineSteps(tourSteps);

export { submitAddressTour };
