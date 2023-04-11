import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { crawler } from "../crawler"
import { checkHrefCheckout } from "../util"
import WidgetView, { ViewProps } from "./WidgetView"

function Checkout({ className }: ViewProps) {
    const [loading, setLoading] = useState(false)
    const history = useNavigate()
    
    useEffect(() => {
        checkHrefCheckout() ? null : history("/not-checkout")
    }, [window.location.href])

    const handleClick = () => {
        setLoading(true)
        // window.location.href = "https://dispensary.gras.com/checkout"
        crawler()
    }

    return (
        <div className={twMerge(className)}>
            {
                loading ? 
                    (
                    <div>
                        <h1>Checking out...</h1>
                        <p>You are being redirected</p>
                    </div>
                    ) : 
                    (
                    <button onClick={handleClick} 
                    className="flex flex-col items-center">
                        <h1>Delivery by Gras - straight to your door</h1>
                        <p>Click here for delivery!</p>
                    </button>
                    )
                }
        </div>
    )
}

function CloseButton() {
    return (
        <div className="cursor-default py-2 text-light text-3xl">
            x
        </div>
    );
}

export default WidgetView(Checkout)