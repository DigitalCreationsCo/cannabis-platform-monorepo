import { selectCartState, selectIsCartEmpty, selectSelectedLocationState, selectUserState } from '@cd/core-lib/reduxDir';
import { renderAddress, urlBuilder } from '@cd/core-lib/utils';
import { Address } from '@cd/data-access';
import { Button, FlexBox, Paragraph } from '@cd/ui-lib';
import { Card, H3, H4, LoadingPage, Page } from "@cd/ui-lib/components";
import axios from 'axios';
import { useState } from 'react';
// import axios from 'axios';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { RenderCart } from '../../components';

function Checkout() {

    const { order, isLoading } = useSelector(selectCartState)

    const cartIsEmpty = useSelector(selectIsCartEmpty)

    const createStripeCheckout = async () => { 
        // validate the order with yup
        const response = await axios.post(urlBuilder.shop + '/api/stripe/checkout-session', order)
     }

    return (
        <>
        { isLoading && <LoadingPage />}
        { !isLoading && 
            <Page className="items-center">
                <Card className="min-w-full space-y-2">
                    <H3 className='text-primary'>
                        Checkout</H3>
                        
                    <div className={styles.banner}>
                        <div><H4>
                            You're ready for checkout</H4>
                        <Paragraph>
                            You can review your order here, and hit <b>Place my order</b> to start delivery.</Paragraph>
                        </div>
                        <div className="lg:w-[300px] h-fit">
                            <Button className='m-auto w-[200px]'
                            size='lg' bg={'primary'} hover={'primary-light'}
                            onClick={createStripeCheckout} 
                            disabled={!!cartIsEmpty}>
                                Place my order</Button>
                        </div>
                    </div>
                    
                    <div className={styles.checkout}>
                        <RenderCart />
                        <FlexBox className={styles.review}>
                            <div className={styles.container}>
                                <Paragraph className={styles.heading}>
                                    Order from</Paragraph>
                                <div className={twMerge(styles.box)}>
                                    <H3 className={styles.heading}>
                                        {order?.organization?.name || ''}</H3>
                                    <Paragraph className="text-center">{renderAddress({ address: order.organization.address })}</Paragraph>
                                </div>
                            </div>
                            <ReviewDeliveryAddress orderAddress={order.destinationAddress} />      
                        </FlexBox>              
                    </div>
                    
                </Card>
            </Page>}
        </>
    );
}

export default Checkout;

function ReviewDeliveryAddress({ orderAddress }: { orderAddress: Address}) {
    const {user} = useSelector(selectUserState)
    const selectedAddress = useSelector(selectSelectedLocationState)
    const [address, setAddress] = useState(selectedAddress['address'])
    const [showDropdown, setShowDropdown] = useState(false)
    
    return (
        // <div className="dropdown">
        //     <Paragraph className='text-primary'>Delivery to</Paragraph>
        //     <div className={twMerge([styles.addressContainer,])}>
        //         {!showDropdown &&
        //         <Button
        //         className='relative flex flex-col h-full w-[300px] m-auto text-center rounded justify-center'
        //         // onClick={() => setShowDropdown(true)}
        //         borderColor='primary'
        //         bg='transparent' 
        //         hover='transparent'
        //         border={true}>
        //             <Paragraph>{user?.firstName} {user?.lastName}</Paragraph>
        //             <Paragraph>{renderAddress({ address: orderAddress })}</Paragraph>
        //         </Button>
        //         }
                
        //         {/* DROPDOWN TO SELECT A DIFFERENT ADDRESS */}
        //         {/* {showDropdown && 
        //         <div>
        //             {user?.address.map((selectAddress, index) => 
        //                 <div className={styles.selectAddress}>
        //                 <Paragraph key={`select-address-${index}`}>
        //                     {renderAddress({ address: selectAddress, showCountry: false, showZipcode: false} )}</Paragraph>
        //                 </div>
        //             )}
        //         </div>
        //         } */}

        //     </div>
        // </div>
        <div className={styles.container}>
            <Paragraph className={styles.heading}>
                Delivery to</Paragraph>
            {!showDropdown &&
            <Button
            // onClick={() => setShowDropdown(true)}
            borderColor='primary' bg='transparent' hover='transparent' border
            className={twMerge([styles.box, 'flex-col w-full h-full'])}
            >
                <Paragraph>{user?.firstName} {user?.lastName}</Paragraph>
                <Paragraph>{renderAddress({ address: orderAddress })}</Paragraph>
            </Button>
            }
        </div>
    );
}

const styles = {
    banner: 'flex space-x-5 lg:justify-between lg:pr-8 items-center',
    
    checkout: 'flex flex-col-reverse lg:flex-row justify-between space-y-4',
    review: 'm-auto md:mr-0 space-y-4 px-8 pb-12',

    container: 'w-[300px]',
    heading: 'text-primary pl-4',
    box: 'border rounded py-4 h-fit',
    selectAddress: ''
}