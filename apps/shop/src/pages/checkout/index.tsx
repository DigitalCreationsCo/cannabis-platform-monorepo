import { selectIsCartEmpty, selectSelectedLocationState } from '@cd/core-lib/reduxDir';
import { renderAddress } from '@cd/core-lib/utils';
import { Button, Paragraph } from '@cd/ui-lib';
import { Card, H3, H4, Page } from "@cd/ui-lib/components";
// import axios from 'axios';
// import { useFormContext } from "components";
import { useSelector } from 'react-redux';
import { RenderCart } from '../../components';

function Checkout() {
    const cartIsEmpty = useSelector(selectIsCartEmpty)
    const selectedAddress = useSelector(selectSelectedLocationState)

    // const { formData } = useFormContext();

    const createStripeCheckout = async () => { 
        // console.log(' client side formData: ', formData)
        // await axios.post('/api/checkout-session', formData)
     }

    return (
        <Page className="items-center">
            <Card className="min-w-full">
            <H3 className='text-primary'>Checkout</H3>
            <div className='flex flex-col md:flex-row justify-between'>
                <div><H4>You're ready for checkout</H4>
                <Paragraph>You can review your order here, and hit <b>Place my order</b> to start delivery.</Paragraph>
                </div>
                <Button
                size='lg'
                bg={'primary'}
                hover={'primary-light'}
                onClick={createStripeCheckout} 
                disabled={!!cartIsEmpty}>
                    Place my order</Button>
            </div>
            <div className='flex flex-row'>
                <RenderCart />
                <ReviewAddress />                    
            </div>
            </Card>
        </Page>
    );
}

export default Checkout;

function ReviewAddress() {
    const selectedAddress = useSelector(selectSelectedLocationState)
    
    return (
        <div>
            hello
            {renderAddress(selectedAddress.address)}
        </div>
    )
}