import * as ReactDOMClient from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import './styles/globals.css';
import Button from "./views/Button";
  
const router = createBrowserRouter([
{
    path: "/",
    element: <Button />,
//   loader: rootLoader,
//   children: [
//     {
//       path: "/",
//       element: <Button />,
//     },
//   ],
},
]);

export default { init: () => 
    ReactDOMClient.createRoot(
    document.getElementById('root')
).render(
    <RouterProvider router={router} />
)}