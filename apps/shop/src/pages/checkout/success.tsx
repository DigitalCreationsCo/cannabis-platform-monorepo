import { cartActions, selectCartState } from '@cd/core-lib';
import { Card, Center, H3, Page, Small } from "@cd/ui-lib";
import { useEffect } from 'react';
import Confetti from "react-confetti";
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';

function CheckoutSuccess() {
    
    const dispatch = useAppDispatch()
    const { order } = useSelector(selectCartState)

    useEffect(() => {
        dispatch(cartActions.emptyCart())
    }, [])
    
    return (
        <Page>
            <Confetti />
            <Card className='m-auto md:max-w-[500px]'>
            <Center className='space-y-2'>
                <H3>Thank you for ordering Delivery&nbsp;by&nbsp;Gras.</H3>
                <Small>From <b>{order.organization.name}</b> and <b>Gras</b>,
                we appreciate your business and the opportunity to serve our community.</Small>

                <Small>
                Your order is being sent to a Gras Delivery Person, and will be delivered soon!{'\n'}
                {/* You will receive an email with your order details. */}
                <b>Check your sms messages for updates on your order.</b>{'\n'}
                Thanks for ordering Delivery by Gras.
                </Small>
            </Center>
            </Card>
        </Page>
    );
}

export default CheckoutSuccess;