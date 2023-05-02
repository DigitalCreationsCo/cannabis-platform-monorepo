import { cartActions, modalActions, modalTypes, selectCartState, selectIsCartEmpty, selectSelectedLocationState, selectUserState, SimpleCart } from "@cd/core-lib";
import { OrderCreate, ProductVariantWithDetails } from "@cd/data-access";
import { Button, Center, H3, H5, Paragraph, Price, SimpleCartItem } from "@cd/ui-lib";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

function ConfirmOrder({ nextFormStep }: { nextFormStep: () => void }) {
    
    const dispatch = useDispatch();

    function openLoginModal() {
        console.log('dispatch: open Login Modal');
        dispatch(
            modalActions.openModal({
                modalType: modalTypes.loginModal
            })
        );
    }
    
    const [cookies, setCookie] = useCookies(['gras-cart-token'])

    // TEST CART
    // const cart:any = {cartItems: [], total: 0}

    const simpleCart: SimpleCart = cookies["gras-cart-token"] && JSON.parse(JSON.stringify(cookies["gras-cart-token"]))

    console.log('simple cart: ', simpleCart)

    // console.log('parse cart token: ', cart)
    // NOTE: Should encrypt this token in the future.

    // NOTE: Add the cart data to redux store at this point, and delete the cookie after this.
    const cartIsEmpty = useSelector(selectIsCartEmpty)
    const cart = useSelector(selectCartState);
    const user = useSelector(selectUserState);
    const selectedLocation = useSelector(selectSelectedLocationState)
    // const checkout = () => { router.push("/checkout"); }

    // useEffect(() => {
    //     if (simpleCart) dispatch(cartActions.saveSimpleCart(simpleCart) as unknown as AnyAction);
    // }, [simpleCart, cart])

    const createOrder = async () => {
        const order:OrderCreate = {
            subtotal: 0, 
            total: cart.total, 
            taxFactor: 0, 
            tax: 0,
            addressId: selectedLocation.address.id,
            customerId: user.user.id,
            organizationId: simpleCart.organizationId || '',
            items: cart.cart,
            isDelivered: false,
        }
        dispatch(cartActions.createOrder(order))
        return order;
    }

    const checkout = async () => { 
        const order = createOrder()
        await axios.post('/api/checkout-session', order)
     }
     
    return (
        <Center className='space-y-2 w-3/4 m-auto pb-20 md:pb-0'>
        <H3>Thanks for ordering Delivery by Gras.
        </H3>
        <H5>Before we deliver to you, let's double check your order here.</H5>
        <div className="flex flex-col md:grid grid-cols-2 gap-2">
            {!cartIsEmpty &&
            cart.cart?.map((product: ProductVariantWithDetails, index: number) => 
            <SimpleCartItem key={`order-item-${index}`} product={product}/>) || 
            <Paragraph className="col-span-2">
                You have no items in your order.</Paragraph> }
            <H5 className="flex justify-end col-span-2">Your total is <Price className="pl-2" price={cart.total || 0} /></H5>
            </div>
            {user.isSignedIn ? (
                <>
                <Paragraph>Hit checkout to complete your delivery order.</Paragraph>
                <Button onClick={checkout} 
                disabled={!!cartIsEmpty}>
                    Checkout</Button>
                </>
                ) : (
                    <>
                <Paragraph>Next, we need your contact info and address so our delivery person can get to you.</Paragraph>
                <Paragraph>Hit Next to provide your info, or sign in</Paragraph>
                <Button 
                // disabled={!!cartIsEmpty}
                onClick={nextFormStep}
                >Next</Button>
                <Button onClick={openLoginModal}>
                    Sign In</Button>
                </>
            )}
        </Center>
    );
}

export default ConfirmOrder;

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
