import { useEffect } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import './styles/globals.css';
import { checkHrefCheckout } from './util';
import Button from './views/Button';
import Checkout from './views/Checkout';
import NotCheckout from './views/NotCheckout';
  
// const router = createMemoryRouter([
//     {
//         path: "/",
//         element: <Button />,
//     //  loader: rootLoader,
//     },
//     {
//       path: "/checkout",
//       element: <Checkout />,
//     },
// ]);

const WidgetContainer = ({children }) => {
    useEffect(() => {
        checkHrefCheckout()
    }, [window.location.href])
    return (
    <div className="absolute bottom-0 right-0 m-4">
        {children}
    </div>
)}

const Router = () => {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={Button} />
                <Route path="/checkout" element={Checkout} />
                <Route path="/not-checkout" element={NotCheckout} />
            </Routes>
        </MemoryRouter>
    )
}

export default { init: () => 
    ReactDOMClient.createRoot(
    document.getElementById('root')
).render(
    <WidgetContainer>
        <Router />
    </WidgetContainer>
)}