import { selectCartState, selectIsCartEmpty, selectSelectedLocationState, selectUserState } from '@cd/core-lib/reduxDir';
import { renderAddress } from '@cd/core-lib/utils';
import { Address } from '@cd/data-access';
import { Button, Paragraph } from '@cd/ui-lib';
import { Card, FlexBox, H3, H4, H5, Page } from "@cd/ui-lib/components";
import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useFormContext } from "components";
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { RenderCart } from '../../components';

function Checkout() {

    const { order } = useSelector(selectCartState)

    const cartIsEmpty = useSelector(selectIsCartEmpty)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (order !== undefined) setLoading(false)
    }, [])
    
    const createStripeCheckout = async () => { 
        // console.log(' client side formData: ', formData)
        // await axios.post('/api/checkout-session', formData)
     }

    return (
        <Page className="items-center">
            {loading ? <div>Loading...</div> :
            (<Card className="min-w-full space-y-2">
            <H3 className='text-primary'>Checkout</H3>
            <div className='flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-5'>
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
            <div className={styles.checkoutContainer}>
                <RenderCart />
                <FlexBox className={styles.info}>
                    <div>
                        <H5 className='text-primary text-center'>
                            Order From {order?.organization?.name}</H5>
                        <div className={styles.addressContainer}>
                            {/* <Paragraph>{renderAddress({ address: order?.organization?.address })}</Paragraph> */}
                        </div>
                    </div>
                    <ReviewDeliveryAddress orderAddress={order.destinationAddress} />      
                </FlexBox>              
            </div>
            </Card>)}
        </Page>
    );
}

export default Checkout;

function ReviewDeliveryAddress({ orderAddress }: { orderAddress: Address}) {
    const {user} = useSelector(selectUserState)
    const selectedAddress = useSelector(selectSelectedLocationState)
    const [address, setAddress] = useState(selectedAddress['address'])
    const [showDropdown, setShowDropdown] = useState(false)
    
    return (
        <div className="dropdown">
            <H5 className='text-primary text-center'>Delivery Address</H5>
            <div className={twMerge([styles.addressContainer,])}>
                {!showDropdown &&
                <Button
                className='relative flex flex-col h-full w-[300px] h-[224px] m-auto text-center rounded justify-start'
                // onClick={() => setShowDropdown(true)}
                borderColor='primary'
                bg='transparent' 
                hover='transparent'
                border={true}>
                    <Paragraph>{user?.firstName} {user?.lastName}</Paragraph>
                    <Paragraph>{renderAddress({ address: orderAddress })}</Paragraph>
                </Button>
                }
                
                {/* DROPDOWN TO SELECT A DIFFERENT ADDRESS */}
                {/* {showDropdown && 
                <div>
                    {user?.address.map((selectAddress, index) => 
                        <div className={styles.selectAddress}>
                        <Paragraph key={`select-address-${index}`}>
                            {renderAddress({ address: selectAddress, showCountry: false, showZipcode: false} )}</Paragraph>
                        </div>
                    )}
                </div>
                } */}

            </div>
        </div>
    );
}

const styles = {
    checkoutContainer: 'flex flex-col-reverse lg:flex-row justify-between space-y-4',
    info: 'm-auto md:m-0 flex-col space-y-8 px-8 pb-12',
    addressContainer: 'flex flex-col h-full w-[300px] m-auto text-center rounded justify-start shadow border',
    selectAddress: ''
}