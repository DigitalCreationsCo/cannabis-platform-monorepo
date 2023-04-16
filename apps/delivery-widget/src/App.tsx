import { useState } from 'react';
// import Button from './views/Button';
// import Checkout from './views/Checkout';

const SwitchComponents = ({ active, children }) => {
    // Switch all children and return the "active" one
    return children.filter(child => child.type.name == active)
}


export default function App(): JSX.Element {
    const [activeComponent, setActiveComponent] = useState("Button")

    return (
        <SwitchComponents active={activeComponent}>
            {/* <Button />
            <Checkout /> */}
        </SwitchComponents>
    )
}


