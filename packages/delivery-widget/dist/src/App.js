import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
// import Button from './views/Button';
// import Checkout from './views/Checkout';
const SwitchComponents = ({ active, children }) => {
    // Switch all children and return the "active" one
    return children.filter(child => child.type.name == active);
};
export default function App() {
    const [activeComponent, setActiveComponent] = useState("Button");
    return (_jsx(SwitchComponents, { active: activeComponent }));
}
