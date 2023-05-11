import { modalActions, modalTypes, selectCartState, selectIsAddressAdded, selectUserState } from '@cd/core-lib';
import { Button, Card, H3, Page } from '@cd/ui-lib';
import RenderCart from 'components/cart/RenderCart';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

function CartPage() {
    const dispatch = useDispatch()
    const user = useSelector(selectUserState);
    const isAddressAdded = useSelector(selectIsAddressAdded)
    
    const Router = useRouter()
    const checkoutOrSignUp = (event: any) => { 
        if (user.isSignedIn && isAddressAdded) { 
            Router.push("/checkout"); 
        } else { 
            event.preventDefault();
            event.stopPropagation();
            dispatch(modalActions.openModal({ modalType: modalTypes.checkoutModal }))
        }
    }
    
    const { totalItems } = useSelector(selectCartState);
    return (
        <Page>
            <Card className={twMerge(styles.cartContainer)}>
                <H3 className="px-8 absolute">Your Bag</H3>
                <RenderCart />
                <Button onClick={checkoutOrSignUp}
                disabled={totalItems < 1}>Checkout</Button>
            </Card>
        </Page>
    );
}

export default CartPage;

const styles = {
    cartContainer: 'min-w-full flex flex-col lg:px-8 py-4 space-y-4',
};