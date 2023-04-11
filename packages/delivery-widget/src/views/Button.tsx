import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { checkHrefCheckout } from "../util"
import WidgetView, { ViewProps } from "./WidgetView"

function Button({ className }: ViewProps) {
    const history = useNavigate()
    
    const handleClick = () => {
        history("/checkout")
    }

    useEffect(() => {
        checkHrefCheckout() ? history("/checkout") : null
    }, [window.location.href])
    
    return (
    <button onClick={handleClick} className={twMerge(className, "tooltip")} data-tip="Click to learn more!">
        <div className="flex flex-col items-center">
            <h1>Delivery by Gras</h1>
            <p>now at checkout</p>
        </div>
    </button>
    )
}

function CloseButton() {
    return (
        <div className="items-center flex px-2 bg-light text-primary font-bold rounded-full text-3xl">
            x
        </div>
    );
}

export default WidgetView(Button)