import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import CartList, { Cart } from "../components/CartItemList"
import { crawler } from "../crawler"
import { checkHrefCheckout } from "../util"
import WidgetView, { ViewProps } from "./WidgetView"

function Checkout({ className }: ViewProps) {
    const [loadingCheckout, setLoadingCheckout] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [cart, setCart] = useState<Cart>({
        cartItems: [],
        total: 0
    })
    // const [total, setTotal] = useState(0)
    const [cartError, setCartError] = useState('')
    const history = useNavigate()
    
    useEffect(() => {
        checkHrefCheckout() ? null : history("/not-checkout")
    }, [window.location.href])
    
    const runCrawler = () => {
        crawler()
        .then(setCart)
        .then(() => setShowCart(true))
        .catch((error) => {
            console.error(error); 
            setCartError(error);
        })
    }

    const getCartData = () => {
        runCrawler()
    }

    const handleCheckout = () => {
        setLoadingCheckout(true)
        // window.location.href = "https://dispensary.gras.com/checkout"
    }

    return (
        <div className={twMerge(className)}>
                { loadingCheckout ? 
                    <div>
                        <h1>Checking out...</h1>
                        <p>You are being redirected</p>
                    </div> : 
                    showCart && <div className="flex flex-col">
                        <CartList cart={cart} cartError={cartError} />
                        <button>Checkout</button>
                    </div> ||
                    <button onClick={getCartData} 
                    className="flex flex-col items-center">
                        <h1>Delivery by Gras - straight to your door</h1>
                        <p>Click here for delivery</p>
                    </button>
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