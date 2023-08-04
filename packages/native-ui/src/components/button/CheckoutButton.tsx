import { cartActions } from '@cd/core-lib/src';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Button, { type ButtonProps } from './Button';

type CheckoutButtonProps = ButtonProps;

function CheckoutButton(props: CheckoutButtonProps) {
	const dispatch = useDispatch();
	const checkout = async () => {
		try {
			const response = await dispatch(
				cartActions.createOrderForCheckout() as any,
			);

			if (response?.error?.message === 'Rejected')
				throw new Error(response.payload);

			// router.push('/checkout');
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		// <Link href='/checkout' className='place-self-center mb-4'>
		<Button
			onPress={checkout}
			bg={'secondary-light'}
			hover={'primary-light'}
			{...props}
		>
			Checkout
		</Button>
		// </Link>
	);
}

export default CheckoutButton;
