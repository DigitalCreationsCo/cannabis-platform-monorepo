import { cartActions } from '@cd/core-lib/src';
import Router from 'next/router';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Button, { ButtonProps } from "./Button";

type CheckoutButtonProps = ButtonProps;

function CheckoutButton(props: CheckoutButtonProps) {
    const dispatch = useDispatch();
    const checkout = async () => {
        try {
        const 
        response = await dispatch(cartActions.createOrderForCheckout() as any)

        if (response.error.message === 'Rejected')
        throw new Error(response.payload);
        
        Router.push('/checkout');
        }
        catch (error: any) {
            toast.error(error.message)
        }
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