import * as ReactDOMClient from 'react-dom/client';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import './styles/globals.css';
import Button from './views/Button';
import Checkout from './views/Checkout';
  
const router = createMemoryRouter([
    {
        path: "/",
        element: <Button />,
    //  loader: rootLoader,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
]);

export default { init: () => 
    ReactDOMClient.createRoot(
    document.getElementById('root')
).render(
    <RouterProvider router={router} />
)}