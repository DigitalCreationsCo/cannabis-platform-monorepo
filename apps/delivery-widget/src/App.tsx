import * as ReactDOMClient from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { DeliveryWidgetConfigOptions } from '.';
import './styles/globals.css';
import Button from './views/Button';
import Checkout from './views/Checkout';

const App = (configProps: DeliveryWidgetConfigOptions) => {
    return (
        // top div is used to keep the button at the bottom of the page, 
        // while also allowing the button to be sticky
        // and having responsive padding at the bottom of the page
        <div className="min-h-[44px] md:min-h-0 bottom-0">
        <div className='fixed md:block min-h-[44px] md:min-h-0 bottom-0 right-0 md:m-4 flex'>
            <Routes>
                <Route path="/" element={Button(configProps)} />
                <Route path="/checkout" element={Checkout(configProps)} />
            </Routes>
        </div>
        </div>
    )
}

export default { init: async (props: DeliveryWidgetConfigOptions) => {
    ReactDOMClient.createRoot(document.getElementById('gras-widget-root') as Element).render(
        <MemoryRouter>
        <App { ...props }/>
        </MemoryRouter>
    )
}}