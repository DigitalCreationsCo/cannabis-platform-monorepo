import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as ReactDOMClient from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import './styles/globals.css';
import Button from './views/Button';
import Checkout from './views/Checkout';
import NotCheckout from './views/NotCheckout';
const WidgetContainer = ({ children }) => {
    return (_jsx("div", { className: "absolute bottom-0 right-0 m-4", children: children }));
};
const Router = () => {
    return (_jsx(MemoryRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: Button }), _jsx(Route, { path: "/checkout", element: Checkout }), _jsx(Route, { path: "/not-checkout", element: NotCheckout })] }) }));
};
export default { init: () => ReactDOMClient.createRoot(document.getElementById('root')).render(_jsx(WidgetContainer, { children: _jsx(Router, {}) })) };
