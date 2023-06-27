import { cartActions, selectCartState, selectIsCartEmpty, selectSelectedLocationState, SimpleCart } from "@cd/core-lib";
import { selectUserState } from "@cd/core-lib/src/reduxDir/features/user.reducer";
import { ProductVariantWithDetails } from "@cd/data-access";
import { Center, CheckBox, H5, Paragraph, Price, SimpleCartItem } from "@cd/ui-lib";
import { Card, CheckoutButton, H2, LayoutContextProps, Page, SignInButton } from "@cd/ui-lib/src/components";
import { AnyAction } from "@reduxjs/toolkit";
import Head from "next/head";
import Router from 'next/router';
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

function QuickDelivery() {
    const user = useSelector(selectUserState)
    const { isLegalAge, idVerified } = user.user

    if (isLegalAge === false || (!isLegalAge && idVerified)) Router.push('/sorry-we-cant-serve-you')
    
    const dispatch = useDispatch();
    
    const [cookies, _, removeCookie] = useCookies(['gras-cart-token'])
    const simpleCart: SimpleCart = cookies["gras-cart-token"] && JSON.parse(JSON.stringify(cookies["gras-cart-token"]))

    const cart = useSelector(selectCartState);
    const cartIsEmpty = useSelector(selectIsCartEmpty)
    const selectedLocation = useSelector(selectSelectedLocationState)

    useEffect(() => {
        // Add the cart token data to redux state, and delete the cookie after this.
        if (simpleCart) dispatch(cartActions.saveSimpleCart(simpleCart) as unknown as AnyAction);
        removeCookie('gras-cart-token')
        console.info('gras-cart-token cookie removed.')
        // NOTE: Should encrypt this token in the future.
    }, [])
     
    const [ confirm, setConfirm ] = useState(false)
    
    const canProceed = !cartIsEmpty && confirm;
    
    return (
        <Page className={twMerge(styles.gradient, "flex h-full pb-0 md:pb-28")}>
            <Head>
                <title>Grascannabis.org - Cannabis, Delivered.</title>
                <meta name="Delivery by Gras App" content="Built by Gras Cannabis Co." />
            </Head>
            <div className="flex grow">
            <Card className='m-auto bg-inverse-soft space-y-2'>
                <H2>Delivery By Gras</H2>
                    
                <Center className='space-y-2 w-3/4 m-auto pb-20 md:pb-0'>
                    { !cartIsEmpty && (
                        <>
                        <H5>Before we deliver your order,
                            <br />let's get it right</H5>
                        <div className="flex flex-col md:grid grid-cols-2 gap-2">

                        
                        { cart.cart?.map((product: ProductVariantWithDetails, index: number) => 
                            <SimpleCartItem key={`order-item-${index}`} product={product}/> )}
                        </div>
                        </>
                        )}
                    
                    { cartIsEmpty &&
                    <Paragraph className="col-span-2">
                        You have no items in your order. {'\n'}
                        Visit your Dispensary store to place an order.</Paragraph> }

                    { !cartIsEmpty && <>
                    <H5 className="flex justify-end col-span-2">
                        Your total is 
                        <Price basePrice={cart.total || 0} /></H5>
                    
                    <Paragraph>Is your order correct?</Paragraph>
                    <CheckBox className="w-[122px]"
                    checked={confirm}
                    label={confirm ? `It's correct` : `No, it's not`}
                    onChange={() => setConfirm(!confirm)} />
                    </>
                    }

                    {user.isSignedIn && canProceed && <>
                        <Paragraph>Hit checkout to complete your delivery order.</Paragraph>
                        <CheckoutButton disabled={!canProceed} />
                        </>
                        }
                        
                    {!user.isSignedIn && canProceed && <>
                        <Paragraph>That's great, except we dont have your info. {'\n'}
                        <b>Please sign in</b>, so our <span className="text-primary">Gras DeliveryPerson</span> can get to you.</Paragraph>
                        <SignInButton />
                        </>
                    }
                </Center>
            </Card>
            </div>
        </Page>
    );
}

QuickDelivery.getLayoutContext = (): LayoutContextProps => ({
    showHeader: false
})

export default QuickDelivery

const styles = { gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', 'p-0 lg:p-16 h-max'] };
