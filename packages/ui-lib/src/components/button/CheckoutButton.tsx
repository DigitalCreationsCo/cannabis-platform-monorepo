import { cartActions, getShopSite } from '@cd/core-lib/src';
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

        if (response?.error?.message === 'Rejected')
        throw new Error(response.payload);
        
        router.push(getShopSite('/checkout'));
        }
        catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <Button
        onClick={checkout}
        bg={'secondary-light'} 
        hover={'primary-light'}
        { ...props }
        >
        Checkout</Button>
    );
}

export default CheckoutButton;