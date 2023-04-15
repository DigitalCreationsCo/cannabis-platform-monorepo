import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
function CartList({ cart, cartError }) {
    return (_jsxs(_Fragment, { children: ["Prepping your order for delivery", cart && cart.cartItems.map((cartItem, index) => (_jsxs("div", { children: [_jsx("img", { src: cartItem.image, height: "50px", width: "50px" }), _jsx("h1", { children: cartItem.name }), _jsx("p", { children: cartItem.price }), _jsx("p", { children: cartItem.weight })] }, `cart-item-${index}`))), cart && _jsx("h1", { children: cart.total }), cartError && _jsx("h1", { children: cartError })] }));
}
export default CartList;
