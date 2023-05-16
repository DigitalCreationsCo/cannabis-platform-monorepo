import { SimpleCart } from "@cd/core-lib/src/reduxDir/features"
import Button from "@cd/ui-lib/src/components/button/Button"
import CloseButton from "@cd/ui-lib/src/components/button/CloseButton"
import { H4, Paragraph } from "@cd/ui-lib/src/components/Typography"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { DeliveryWidgetConfigOptions } from "../.."
import CartList from "../components/CartItemList"
import { cheerioCrawler as crawler } from "../crawler"
import WidgetView, { WidgetViewProps } from "./WidgetView"

function Checkout({ className, expandWidget, setExpandWidget, dispensaryKey }: WidgetViewProps & DeliveryWidgetConfigOptions) {
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
        // window.location.href = process.env.NEXT_PUBLIC_SHOP_APP_URL + "/quick-delivery"
        // window.location.href = "https://dispensary.gras.com/quick-delivery"
    }

    // const history = useNavigate()
    
    // function goToCheckout() {
    //     console.log('is checkout? ', useCheckHrefIncludes('checkout'))
    //     useCheckHrefIncludes('checkout') ? history('/checkout') : null 
    // }

    // useEffect(() => {
    //     console.log('widget rendered: Checkout')
    // })
    
    // useEffect(() => {
    //     goToCheckout()
    //     return () => {
    //         goToCheckout()
    //     }
    // }, [])

    // useEffect(() => {
    //     console.log('window location changed')
    //     goToCheckout()
    //     return () => {
    //         console.log('window location changed cleanup')
    //     }
    // }, [window.location])
      
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
                    <Paragraph className="text-light m-auto">If you're ready for checkout, hit the button below.</Paragraph>
                    <Button className="p-4" onClick={handleCheckout}>Checkout</Button>
                </div> :
                <button className={twMerge(styles.checkout)}
                    onClick={getCartData}>
                    <H4 color="light" className="m-auto">Delivery by Gras - straight to your door</H4>
                    <Paragraph className="cursor-pointer m-auto w-fit border-b-2" color="light">
                        Click here to start your delivery</Paragraph>
                </button>
            }
        </>
    )
}

export default WidgetView(Checkout)