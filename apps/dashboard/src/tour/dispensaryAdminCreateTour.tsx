import { TextContent } from "@cd/core-lib/constants";
import { Boarding } from "boarding.js";
import "boarding.js/styles/main.css";
import "boarding.js/styles/themes/basic.css";

const 
dispensaryAdminCreateTour = new Boarding({
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
    }
})

dispensaryAdminCreateTour.defineSteps(
    [
        {
        element: '#dispensary-admin-create-step-1',
        popover: {
            title: TextContent.account.CREATE_YOUR_ACCOUNT,
            description: TextContent.account.ABOUT_DISPENSARY_ADMIN_ACCOUNT
        },
    },
    {
        element: '#dispensary-admin-create-step-2',
        popover: {
            title: TextContent.prompt.FORM_FIELDS,
            description: "",
        },
    },
        {
        element: '#dispensary-admin-create-step-3',
        popover: {
            title: TextContent.legal.READ_USER_TERMS_OF_SERVICE,
            description: ''
        },
    },
    {
        element: '#dispensary-admin-create-step-4',
        popover: {
            title: TextContent.prompt.CONTINUE,
            description: ``,
        },
    },
]);

export { dispensaryAdminCreateTour };
