import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import CartList from "../components/CartItemList";
import { crawler } from "../crawler";
import { checkHrefCheckout } from "../util";
import WidgetView from "./WidgetView";
function Checkout({ className }) {
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [cart, setCart] = useState(null);
    const [cartError, setCartError] = useState(null);
    const history = useNavigate();
    useEffect(() => {
        checkHrefCheckout() ? null : history("/not-checkout");
    }, [window.location.href]);
    const runCrawler = () => {
        crawler()
            .then(setCart)
            .then(() => setShowCart(true))
            .catch((error) => {
            console.error(error);
            setCartError(error);
        });
    };
    const getCartData = () => {
        runCrawler();
    };
    const handleCheckout = () => {
        setLoadingCheckout(true);
        // window.location.href = "https://dispensary.gras.com/checkout"
    };
    return (_jsx("div", { className: twMerge(className), children: loadingCheckout ?
            _jsxs("div", { children: [_jsx("h1", { children: "Checking out..." }), _jsx("p", { children: "You are being redirected" })] }) :
            showCart && _jsxs("div", { className: "flex flex-col", children: [_jsx(CartList, { cart: cart, cartError: cartError }), _jsx("button", { children: "Checkout" })] }) ||
                _jsxs("button", { onClick: getCartData, className: "flex flex-col items-center", children: [_jsx("h1", { children: "Delivery by Gras - straight to your door" }), _jsx("p", { children: "Click here for delivery" })] }) }));
}
function CloseButton() {
    return (_jsx("div", { className: "cursor-default py-2 text-light text-3xl", children: "x" }));
}
export default WidgetView(Checkout);
