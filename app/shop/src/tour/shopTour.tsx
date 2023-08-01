import { Boarding } from "boarding.js";
import "boarding.js/styles/main.css";
import "boarding.js/styles/themes/basic.css";

const shopTour = new Boarding();
const tourSteps = [
  {
    element: '#step1',
    popover: {
      title: 'Step 1',
      description: 'This is the first step of the tour.',
    },
  },
  {
    element: '#step2',
    popover: {
      title: 'Step 2',
      description: 'This is the second step of the tour.',
    },
  },
  // Add more steps as needed
];
shopTour.defineSteps(tourSteps);

export { shopTour };
