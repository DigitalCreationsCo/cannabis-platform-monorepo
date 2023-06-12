import { modalActions, modalTypes, selectIsAddressAdded, selectIsCartEmpty, selectUserState } from '@cd/core-lib';
import { Card, CheckoutButton, H3, Page } from '@cd/ui-lib';
import RenderCart from 'components/cart/RenderCart';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

function CartPage() {
    const dispatch = useDispatch()
    const user = useSelector(selectUserState);
    const isAddressAdded = useSelector(selectIsAddressAdded)
    
    const Router = useRouter()
    const checkoutOrSignUp = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        if (user.isSignedIn && isAddressAdded) { 
            Router.push("/checkout"); 
        } else { 
            dispatch(modalActions.openModal({ modalType: modalTypes.checkoutModal }))
        }
    }
    
    const bagIsEmpty = useSelector(selectIsCartEmpty) as boolean;
    return (
        <Page>
            <Head>
                <title>Grascannabis.org My Shopping Bag</title>
                <meta name="Gras App" content="Built by Gras Cannabis Co." />
            </Head>
            <Card className={twMerge(styles.cartContainer)}>
                <H3 className="px-8 absolute">My Bag</H3>
                <RenderCart />
                <CheckoutButton 
                disabled={bagIsEmpty}
                onClick={checkoutOrSignUp} />
            </Card>
        </Page>
    );
}

export default CartPage;

const styles = {
    cartContainer: 'min-w-full flex flex-col lg:px-8 py-4 space-y-4',
};