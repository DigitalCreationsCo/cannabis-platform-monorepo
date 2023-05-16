import { cartActions } from '@cd/core-lib/src';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import Button, { ButtonProps } from "./Button";

type CheckoutButtonProps = ButtonProps;

function CheckoutButton(props: CheckoutButtonProps) {
    const dispatch = useDispatch();
    const checkout = () => {
        dispatch(cartActions.createOrderForCheckout() as any)
        Router.push('/checkout');
    }

    return (
        // <Link href='/checkout' className='place-self-center mb-4'>
            <Button
            onClick={checkout}
            bg={'secondary-light'} 
            hover={'primary-light'}
            { ...props }
            >
            Checkout</Button>
        // </Link>
    );
}

export default CheckoutButton;