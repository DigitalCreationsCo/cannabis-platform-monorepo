import { renderAddress, selectCartState, selectIsCartEmpty, selectSelectedLocationState, selectUserState, urlBuilder } from '@cd/core-lib';
import { Address, AddressUserCreateType } from '@cd/data-access';
import { Button, Card, FlexBox, H3, H4, LoadingPage, Page, Paragraph } from '@cd/ui-lib';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { RenderCart } from '../../components';

function Checkout() {

    const [loadingButton, setLoadingButton] = useState(false);
    
    const { order, isLoading } = useSelector(selectCartState)

    const cartIsEmpty = useSelector(selectIsCartEmpty)

    async function createStripeCheckout () {
        try {

            // console.info('preparing this order to checkout: ', order)
            const 
            response = await axios.post(
                urlBuilder.shop + '/api/stripe/checkout-session', 
                order,
            );

            if (response.status === 404)
            throw new Error(response.data.error);

            if (response.status === 400)
            throw new Error(response.data.error);

            if (response.status === 500)
            throw new Error("We're sorry. Checkout is not available. Please try again later.");
            
            if (response.status === 302) {
                setLoadingButton(true);
                if (response.data.success)
                window.location.href = response.data.redirect
            }
            
        }
        catch (error: any) {
            // console.error('create checkout error:', error)
            throw new Error(error.message)
        }
    }

    const onSubmit = async () => {
        try {
            setLoadingButton(true);
            
            await 
            createStripeCheckout();

            toast.success('Success');
            setLoadingButton(false);
            
        } catch (error: any) {
            console.info('submit checkout error ', error);
            toast.error(error.message);
            setLoadingButton(false);
        }
    };

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
                            <Button 
                            className={twMerge(
                                loadingButton ? 'bg-primary-light' : 'bg-primary', 
                                'm-auto w-[200px]' )}
                            loading={loadingButton}
                            disabled={!!cartIsEmpty}
                            bg='primary'
                            size='lg' 
                            hover={'primary-light'}
                            onClick={onSubmit}>
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
                                        
                                    <Paragraph className="text-center">
                                        {renderAddress({ address: order.organization.address })}</Paragraph>
                                </div>
                            </div>
                            
                            <ReviewDeliveryAddress 
                            orderAddress={order.destinationAddress} 
                            />      
                        </FlexBox>              
                    </div>
                    
                </Card>
            </Page>}
        </>
    );
}

export default Checkout;

function ReviewDeliveryAddress({ orderAddress }: { orderAddress: Address | AddressUserCreateType}) {
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
                <Paragraph>{renderAddress({ address: orderAddress as Address })}</Paragraph>
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