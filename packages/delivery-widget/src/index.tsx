import * as ReactDOMClient from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import './styles/globals.css';
import Button from './views/Button';
import Checkout from './views/Checkout';
  
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

const Router = () => {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Button />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </MemoryRouter>
    )
}

export default { init: () => 
    ReactDOMClient.createRoot(
    document.getElementById('root')
).render(
    <Router />
)}