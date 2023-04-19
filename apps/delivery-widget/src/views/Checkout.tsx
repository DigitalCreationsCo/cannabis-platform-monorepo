import Button from "@cd/ui-lib/src/components/Button"
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
        window.location.href = "http://localhost:3000/browse"
        // window.location.href = "https://dispensary.gras.com/checkout"
    }

    return (
        <div className={twMerge('w-[240px]', className)}>
                { 
                    showCart ? loadingCheckout &&
                    <div className="flex flex-col h-[420px] w-[340px] m-auto content-center justify-center items-center place-content-center">
                        <h1 className="text-lg">Checking out...</h1>
                        <p>You will be redirected</p>
                    </div> ||
                    <div className="flex flex-col h-[420px] w-[340px]">
                        <CartList cart={cart} cartError={cartError} />
                        If you're ready for checkout, click the button below.
                        <Button className="p-4" onClick={handleCheckout}>Checkout</Button>
                    </div> :
                    <button onClick={getCartData} 
                    className="flex flex-col items-center w-full">
                        <h1>Delivery by Gras - straight to your door</h1>
                        <p>Click here to start your delivery</p>
                    </button>
                }
        </div>
    )
}

export default WidgetView(Checkout)