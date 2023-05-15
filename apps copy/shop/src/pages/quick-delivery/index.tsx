import { cartActions, modalActions, modalTypes, selectCartState, selectIsCartEmpty, selectSelectedLocationState, SimpleCart } from "@cd/core-lib";
import { selectUserState } from "@cd/core-lib/reduxDir";
import { OrderCreate, ProductVariantWithDetails } from "@cd/data-access";
import { Button, Center, H5, Paragraph, Price, SimpleCartItem } from "@cd/ui-lib";
import { Card, H2, LayoutContextProps, Page } from "@cd/ui-lib/src/components";
import { AnyAction } from "@reduxjs/toolkit";
import { ConfirmOrder, QuickSignUpUserForm, SubmitAddress, VerifyPhotoId } from "components";
import Head from "next/head";
import Router from 'next/router';
import { FormStepComponentProps } from "pages/quick-delivery";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

type FormStepComponentProps = { 
    nextFormStep: () => void; 
    prevFormStep: () => void; 
}

function QuickDelivery() {
    const user = useSelector(selectUserState)
    const { isLegalAge, idVerified } = user.user

    if (!isLegalAge === false || (!isLegalAge && idVerified)) Router.push('/sorry-we-cant-serve-you')
    
    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    const FormStepComponents = [
        ConfirmOrder,
        !idVerified && VerifyPhotoId || isLegalAge && idVerified && null, // if there is no user, or user is over21, not age verified, then verify photo id
        !user.isSignedIn && QuickSignUpUserForm || null,
        (user.user.address.length < 1 || !user.isSignedIn) && SubmitAddress || null,
    ];
    
    const dispatch = useDispatch();
    
    const [cookies, _, removeCookie] = useCookies(['gras-cart-token'])
    const simpleCart: SimpleCart = cookies["gras-cart-token"] && JSON.parse(JSON.stringify(cookies["gras-cart-token"]))

    const cart = useSelector(selectCartState);
    const cartIsEmpty = useSelector(selectIsCartEmpty)
    const selectedLocation = useSelector(selectSelectedLocationState)

    useEffect(() => {
        // console.log('simple Cart: ', simpleCart)
        if (simpleCart) dispatch(cartActions.saveSimpleCart(simpleCart) as unknown as AnyAction);
        
        removeCookie('gras-cart-token')
        console.info('gras-cart-token cookie removed.')
        // NOTE: Should encrypt this token in the future.
        // NOTE: Add the cart data to redux store at this point, and delete the cookie after this.

    }, [])

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

    // const checkout = async () => { 
    //     const order = createOrder()
    //     await axios.post('/api/checkout-session', order)
    // }

    const checkout = () => {
        Router.push('/checkout');
    }
     
    return (
            <Page className={twMerge(styles.gradient, "pb-0 md:pb-24")}>
                <Head>
                    <title>Delivery by Gras</title>
                </Head>
                <Card className='m-auto bg-inverse-soft space-y-2'>
                    <H2>Quick Delivery</H2>
                    
        <Center className='space-y-2 w-3/4 m-auto pb-20 md:pb-0'>
            <H5>Before you get your delivery,
                <br />Let's double check your order here.</H5>
            <div className="flex flex-col md:grid grid-cols-2 gap-2">

            {!cartIsEmpty &&
            cart.cart?.map((product: ProductVariantWithDetails, index: number) => 
            <SimpleCartItem key={`order-item-${index}`} product={product}/>) || 
            <Paragraph className="col-span-2">
                You have no items in your order.</Paragraph> }

            <H5 className="flex justify-end col-span-2">
                Your total is 
                <Price basePrice={cart.total || 0} /></H5>
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
                <Paragraph>We'll need your contact info and address so our delivery person can get to you.</Paragraph>
                <Paragraph>Hit Next to provide your info, or <i>sign in</i></Paragraph>
                <Button 
                disabled={!!cartIsEmpty}
                onClick={nextFormStep}
                >Next</Button>
                <Button onClick={openLoginModal}>
                    Sign In</Button>
                </>
            )}
        </Center>

                </Card>
            </Page>
        );

    function openLoginModal() {
        dispatch(
            modalActions.openModal({
                modalType: modalTypes.loginModal
            })
        );
    }
}

QuickDelivery.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false
})

export default QuickDelivery
export type { FormStepComponentProps };
const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', 'p-0 lg:p-16 h-max'] };
