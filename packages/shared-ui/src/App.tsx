import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Button from './Button';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <div className="flex">
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1 className="bg-blue-500">Vite + React</h1>
            <div className="card">
                <Button onClick={() => setCount((count) => count + 1)} state={count}>
                    count is {count}
                </Button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </div>
    );
}

export default App;
