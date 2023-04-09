import { useEffect, useState } from "react"

export default function Checkout() {
    const [loading, setLoading] = useState(false)

    function checkHrefCheckout() {
        const href = window.location.href
        if (href.includes("checkout")) {
            return true
        } else {
            return false
        }
    }
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
                (<div>
                <button onClick={handleClick}>Get Delivery by Gras</button>
                </div>)
            : (
            <div>
                <p>Gras and 'dispensary' are teaming up to delivery your goods straight to your home. </p>
                <h1>Click here during checkout to get your order by delivery</h1>
            </div>
            )}
        </div>
    )
}