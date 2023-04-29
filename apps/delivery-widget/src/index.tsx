import * as ReactDOMClient from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import './styles/globals.css';
import Button from './views/Button';
import Checkout from './views/Checkout';

const Router = () => {
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
        <MemoryRouter>
            <Routes>
                <Route path="/" element={Button()} />
                <Route path="/checkout" element={Checkout()} />
            </Routes>
        </MemoryRouter>
        </div></div>
    )
}

export default { init: () => 
    ReactDOMClient.createRoot(document.getElementById('gras-widget-root') as Element).render(
        <Router />
)}