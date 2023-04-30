import { useEffect, useState } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './styles/globals.css';
import Button from './views/Button';
import Checkout from './views/Checkout';

const Router = () => {
    const history = useNavigate()
    
    const [location, setLocation] = useState(window?.location?.pathname)
    const [changed, setChange] = useState(false)
    useEffect(() => {
        // console.log('location: ', location)
        // setLocation(prev => {
        //     if (prev != window.location.pathname) {
        //         setChange(true)
        //         return window.location.pathname
        //     }
        //     return window.location.pathname
        // })
        // console.log('changed? ', changed)

        if (location === window.location.pathname && !changed) {
            history(window.location.pathname)
            setChange(true)
            console.log('location not changed: ', location)
            // setChange(true)
            // setLocation(window.location.pathname)
        } 
        else if (location !== window.location.pathname && changed) {
            console.log('location changed: ', location)
            // setLocation(window.location.pathname)
            setChange(false)
        }

        // console.log(window.location.pathname)
        // console.log('window location changed: Router')
        // if (location.includes('checkout') && changed) {
        //     history('/checkout')
        //     console.log('at checkout')
        // }
        // else if (!location.includes('checkout') && changed) { 
        //     history('/')
        //     console.log('not at checkout')
        // }

    })

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
            <Routes>
                <Route path="/" element={Button()} />
                <Route path="/checkout" element={Checkout()} />
            </Routes>
        </div>
        </div>
    )
}

export default { init: async () => {
    ReactDOMClient.createRoot(document.getElementById('gras-widget-root') as Element).render(
        <MemoryRouter>
        <Router />
        </MemoryRouter>
    )
}}