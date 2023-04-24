import { OrderItem, OrderItemWithDetails } from "@cd/data-access";
import { Button, Center, H3, H5, H6, Paragraph, Price } from "@cd/ui-lib";
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
    
    const cart = cookies["gras-cart-token"] && JSON.parse(JSON.stringify(cookies["gras-cart-token"])) as OrderItem || null
    console.log('parse cart token: ', cart)
    // NOTE: Should encrypt this token in the future.

    return (
        <Center className='space-y-2 w-3/4 m-auto pb-20 md:pb-0'>
        <H3>Thank you for ordering Delivery by Gras.
        </H3>
        <H5>Before we deliver to you, let's double check your order here.</H5>
        <div className="flex flex-col md:grid grid-cols-2 gap-2">
            {cart.cartItems.length > 0 && cart.cartItems.map((product: OrderItemWithDetails, index) => (
            <div key={`order-item-${index}`} className="border flex space-x-2 items-center p-4 rounded justify-between">
                <H6>{product.name}</H6>
                <Paragraph>{product.size + product.unit}</Paragraph>
                <Price price={product.salePrice || product.basePrice} />
            </div>

            )) || <div>You have no items in your order.</div>}
            <H5 className="flex justify-end col-span-2">Your total is <Price className="pl-2" price={cart.total || 0} /></H5>
            </div>
            <H5>Next, we need your contact info and address so our delivery person can get to you.</H5>
            <Button onClick={nextFormStep}
            >Next</Button>
        </Center>
    );
}

export default ConfirmOrder;