import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { checkHrefCheckout } from "../util";
import WidgetView from "./WidgetView";
function Button({ className }) {
    const history = useNavigate();
    const handleClick = () => {
        history("/checkout");
    };
    useEffect(() => {
        checkHrefCheckout() ? history("/checkout") : null;
    }, [window.location.href]);
    return (_jsx("button", { onClick: handleClick, className: twMerge(className, "tooltip"), "data-tip": "Click to learn more!", children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("h1", { children: "Delivery by Gras" }), _jsx("p", { children: "now at checkout" })] }) }));
}
function CloseButton() {
    return (_jsx("div", { className: "items-center flex px-2 bg-light text-primary font-bold rounded-full text-3xl", children: "x" }));
}
export default WidgetView(Button);
