import { useEffect, useState } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import './styles/globals.css';
import Button from './views/Button';
import Checkout from './views/Checkout';

const Router = () => {
    // const history = useNavigate()
    
    const [location, setLocation] = useState(window?.location?.pathname)
    useEffect(() => {
        console.log(window.location.pathname)
        console.log('window location changed: Router')
        if (location.includes('checkout')) {
            // history('/checkout')
            console.log('at checkout')
        }
        else { 
            // history('/')
            console.log('not at checkout')
        }
    }, [location])

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
        <div className='absolute flex h-20 md:h-0'>
        <div className="fixed bottom-0 h-auto md:right-0 md:m-4">
        <MemoryRouter>
            <Routes>
                <Route path="/" element={Button()} />
                <Route path="/checkout" element={Checkout()} />
            </Routes>
        </MemoryRouter>
        </div>
        </div>
    )
}

export default { init: async () => {
    ReactDOMClient.createRoot(document.getElementById('gras-widget-root') as Element).render(
        <Router />
    )
}}