import { SimpleCart } from "@cd/core-lib/src/reduxDir/features"
import Button from "@cd/ui-lib/src/components/button/Button"
import CloseButton from "@cd/ui-lib/src/components/button/CloseButton"
import { Paragraph, Small } from "@cd/ui-lib/src/components/Typography"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { DeliveryWidgetConfigOptions } from "../.."
import CartList from "../components/CartItemList"
import { cheerioCrawler as crawler } from "../crawler"
import WidgetView, { WidgetViewProps } from "./WidgetView"

function Checkout({ className, expandWidget, setExpandWidget, dispensaryKey, name }: WidgetViewProps & DeliveryWidgetConfigOptions) {
    const [cart, setCart] = useState<SimpleCart>({
        cartItems: [],
        total: 0,
        organizationId: dispensaryKey
    })
    const [cartError, setCartError] = useState('')
    
    const [loadingCheckout, setLoadingCheckout] = useState(false)
    
    const handleCheckout = () => {
        setLoadingCheckout(true)
        window.location.href = "http://localhost:3000/quick-delivery"
    }

    const runCrawler = () => {
        crawler()
        .then(result => setCart({...cart, ...result}))
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
        loading: [className, "md:!rounded", "flex flex-col items-center justify-center", "md:w-[440px] min-h-[440px]"],
        showCart: [className, "md:!rounded", "flex flex-col justify-between m-auto", "md:w-[440px] min-h-[440px] space-y-2"],
        capsule: [className, 'md:rounded-full', 'cursor-pointer']
    }
    return (
        <>
            {
                expandWidget ? loadingCheckout &&
                <div className={twMerge(styles.loading)}>
                    <Paragraph color="light" className="animate-bounce text-lg">
                        Checking out...</Paragraph>
                    
                    <Small color="light">
                        moving to Gras</Small>
                </div> ||
                
                <div className={twMerge(styles.showCart)}>
                    
                    <CloseButton className="p-4" onClick={() => setExpandWidget(false)} />

                    <CartList 
                    setExpandWidget={setExpandWidget} 
                    cart={cart} 
                    cartError={cartError} />

                    <Small className="text-light m-auto">
                        If you're ready for checkout, hit the button below.</Small>

                    <Button className="p-4 bg-inverse hover:bg-accent hover:text-inverse"
                    onClick={handleCheckout}>
                        Checkout</Button>
                </div> :
                <button className={twMerge(styles.capsule)}
                    onClick={getCartData}>

                    <Paragraph color="light" className="m-auto">
                        Delivery by Gras to your door</Paragraph>
                        
                    <Small className="cursor-pointer m-auto w-fit border-b-2" color="light">
                        Click here to start your delivery</Small>
                </button>
            }
        </>
    )
}

export default WidgetView(Checkout)