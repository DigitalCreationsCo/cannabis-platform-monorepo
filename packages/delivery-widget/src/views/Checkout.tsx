import { useEffect, useState } from "react"
import { checkHrefCheckout } from "../util"

export default function Checkout() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        checkHrefCheckout()
    }, [window.location.href])

    const handleClick = () => {
        setLoading(true)
        // window.location.href = "https://dispensary.gras.com/checkout"
    }

    return (
        <div className="border absolute bottom-0 right-0 m-2 p-4 rounded-full bg-primary">
            {
                loading ? 
                <div>
                    <h1>Checking out...</h1>
                    <p>You are being redirected</p>
                </div> : 
                checkHrefCheckout() ? 
                (
                <div className="flex flex-col items-center">
                <button onClick={handleClick}>Get Delivery by Gras</button>
                </div>
                )
            : (
            <div className="flex flex-row items-center">
                <div className="flex flex-col">
                <p>Gras and 'dispensary' are teaming up to delivery your goods straight to your home. </p>
                <h1>Click here during checkout to get your order by delivery</h1>
                </div>
                <CloseButton />
            </div>
            )}
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
