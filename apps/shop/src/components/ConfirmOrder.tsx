import { ProductVariantWithDetails } from "@cd/data-access";
import { Button, Center, H3, H5, Paragraph, Price, SimpleCartItem } from "@cd/ui-lib";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useFormContext } from "./StepFormProvider";

function ConfirmOrder({ nextFormStep }: { nextFormStep: () => void }) {

    const { resetFormValues, setFormValues } = useFormContext();
    
    useEffect(() => {
        const createNewFormContext = () => {
            console.info('creating new form context for Quick Delivery Form')
            resetFormValues()
        }
    
        createNewFormContext()
    }, [])
    
    const [cookies, setCookie] = useCookies(['gras-cart-token'])

    // TEST CART
    // const cart:any = {cartItems: [], total: 0}

    const cart:  = cookies["gras-cart-token"] && JSON.parse(JSON.stringify(cookies["gras-cart-token"]))
    
    const cartIsEmpty = cart.cartItems.length < 1
    // console.log('parse cart token: ', cart)
    // NOTE: Should encrypt this token in the future.

    // NOTE: Add the cart data to redux store at this point, and delete the cookie after this.

    return (
        <Center className='space-y-2 w-3/4 m-auto pb-20 md:pb-0'>
        <H3>Thank you for ordering Delivery by Gras.
        </H3>
        <H5>Before we deliver to you, let's double check your order here.</H5>
        <div className="flex flex-col md:grid grid-cols-2 gap-2">
            {!cartIsEmpty &&
            cart.cartItems.map((product: ProductVariantWithDetails, index: number) => 
            <SimpleCartItem key={`order-item-${index}`} product={product}/>) || 
            <Paragraph className="col-span-2">
                You have no items in your order.</Paragraph> }
            <H5 className="flex justify-end col-span-2">Your total is <Price className="pl-2" price={cart.total || 0} /></H5>
            </div>
            <H5>Next, we need your contact info and address so our delivery person can get to you.</H5>
            <Button 
            disabled={cartIsEmpty}
            onClick={nextFormStep}
            >Next</Button>
        </Center>
    );
}

export default ConfirmOrder;