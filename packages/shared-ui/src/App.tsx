import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import { H3 } from './Typography';
import IconWrapper from './IconWrapper';
import Icons from './icons';
import Grid from './Grid';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className='App'>
            <div className="flex bg-inverse">
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <H3>Cannabis Delivery shared-UI package</H3>
            <Grid>
                { Object.values(Icons).map((Icon, i) => <IconWrapper Icon={ Icon } />) }
            </Grid>
        </div>
    );
}

export default App;
