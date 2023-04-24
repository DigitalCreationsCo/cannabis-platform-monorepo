import Button from "@cd/ui-lib/src/components/Button"
import CloseButton from "@cd/ui-lib/src/components/CloseButton"
import { H4, Paragraph } from "@cd/ui-lib/src/components/Typography"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import CartList, { Cart } from "../components/CartItemList"
import { crawler } from "../crawler"
import { checkHrefCheckout } from "../util"
import WidgetView, { ViewProps } from "./WidgetView"

function Checkout({ className, expandWidget, setExpandWidget }: ViewProps) {
    const [cart, setCart] = useState<Cart>({
        cartItems: [],
        total: 0
    })
    const [cartError, setCartError] = useState('')
    
    const [loadingCheckout, setLoadingCheckout] = useState(false)
    
    const handleCheckout = () => {
        setLoadingCheckout(true)
        window.location.href = "http://localhost:3000/quick-delivery"
        // window.location.href = "https://dispensary.gras.com/quick-delivery"
    }
    
    const history = useNavigate()
    
    useEffect(() => {
        checkHrefCheckout() ? null : history("/")
        console.log('checkout? ', checkHrefCheckout())
    }, [window.location.href])
    
    const runCrawler = () => {
        crawler()
        .then(setCart)
        .then(() => setExpandWidget(true))
        .catch((error) => {
            console.error(error); 
            setCartError(error);
        })
    }

    const getCartData = () => {
        runCrawler()
    }

    const styles = {
        loadingCheckout: [className, "md:!rounded", "flex flex-col items-center justify-center", "md:w-[440px]"],
        showCart: [className, "md:!rounded", "flex flex-col justify-between m-auto", "md:w-[440px]"],
        checkout: [className, 'md:rounded-full', 'cursor-pointer']
    }
    return (
        <>
            {
                expandWidget ? loadingCheckout &&
                <div className={twMerge(styles.loadingCheckout, 'min-h-[540px]')}>
                    <H4 color="light" className="animate-bounce text-lg">Checking out...</H4>
                    <Paragraph color="light">You will be redirected</Paragraph>
                </div> ||
                <div className={twMerge(styles.showCart, 'min-h-[540px] overflow-scroll', 'space-y-1')}>
                    <CloseButton className="p-4" onClick={() => setExpandWidget(false)} />
                    <CartList setExpandWidget={setExpandWidget} cart={cart} cartError={cartError} />
                    <Paragraph className="text-light m-auto">If you're ready for checkout, click the button below.</Paragraph>
                    <Button className="p-4" onClick={handleCheckout}>Checkout</Button>
                </div> :
                <button className={twMerge(styles.checkout)}
                    onClick={getCartData}>
                    <H4 color="light" className="cursor-pointer m-auto">Delivery by Gras - straight to your door</H4>
                    <Paragraph className="cursor-pointer m-auto w-fit border-b-2 hover:border-secondary" color="light">
                        Click here to start your delivery</Paragraph>
                </button>
            }
        </>
    )
}

export default WidgetView(Checkout)