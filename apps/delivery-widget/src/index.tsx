import { PropsWithChildren } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import './styles/globals.css';
import Button from './views/Button';
import Checkout from './views/Checkout';
import NotCheckout from './views/NotCheckout';

const WidgetContainer = ({children }: PropsWithChildren) => {
    // const [scrollHeight, setScrollHeight] = React.useState(0)
    
    // const setScroll = () => {
    //     setScrollHeight(window.scrollY)
    // }
    
    // useEffect(() => {
    //     window.addEventListener('scroll', setScroll);
    //     return () => {
    //         window.removeEventListener('scroll', setScroll)
    //     }
    // }, [])
      
    // console.log('scrollheight', scrollHeight)
    return (
        // top div is used to keep the button at the bottom of the page, 
        // while also allowing the button to be sticky
        // and having responsive padding at the bottom of the page
        <div className='flex h-20 md:h-0'>
        <div className="fixed bottom-0 h-auto md:right-0 md:m-4">
            {children}
        </div></div>
    )
}

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
    ReactDOMClient.createRoot(document.getElementById('root') as Element).render(
    <WidgetContainer>
        <Router />
    </WidgetContainer>
)}