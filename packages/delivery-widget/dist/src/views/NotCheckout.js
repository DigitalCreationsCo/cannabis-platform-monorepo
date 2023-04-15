import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { CloseButton } from "@cd/ui-lib"
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { checkHrefCheckout } from "../util";
import WidgetView from "./WidgetView";
function NotCheckout({ className }) {
    useEffect(() => {
        checkHrefCheckout();
    }, [window.location.href]);
    return (_jsx("div", { className: twMerge(className), children: _jsx("div", { className: "flex flex-row items-center", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("p", { children: "Gras and 'dispensary' are teaming up to delivery your goods straight to your home. " }), _jsx("h1", { children: "Click here at checkout for your order delivery!" })] }) }) }));
}
// function CloseButton() {
//     return (
//         <div className="cursor-default py-2 text-light text-3xl">
//             x
//         </div>
//     );
// }
export default WidgetView(NotCheckout);
