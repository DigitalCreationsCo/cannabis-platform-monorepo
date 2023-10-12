import {
	cartActions,
	getShopSite,
	isLegalAgeAndVerified,
	modalActions,
	modalTypes,
	selectIsAddressAdded,
	selectIsCartEmpty,
	selectUserState,
} from '@cd/core-lib';
import {
	Card,
	CheckoutButton,
	H3,
	Page,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { RenderCart } from '../components';

function CartPage() {
	const dispatch = useDispatch();
	const user = useSelector(selectUserState);
	const isAddressAdded = useSelector(selectIsAddressAdded);

	const router = useRouter();
	const checkoutOrCompleteSignUp = async (event: any) => {
		try {
			event.preventDefault();
			event.stopPropagation();
			if (user.isSignedIn && isAddressAdded && user.user.isSignUpComplete) {
				if (!isLegalAgeAndVerified(user.user))
					router.push(getShopSite('/sorry-we-cant-serve-you'));
				else {
					const response = await dispatch(
						cartActions.createOrderForCheckout() as any,
					);
					if (response?.error?.message === 'Rejected')
						throw new Error(response.payload);
					router.push('/checkout');
				}
			} else {
				dispatch(
					modalActions.openModal({ modalType: modalTypes.checkoutModal }),
				);
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const bagIsEmpty = useSelector(selectIsCartEmpty) as boolean;
	return (
		<Page className="bg-inverse-soft pt-8">
			<Head>
				<title>Grascannabis.org My Shopping Bag</title>
				<meta name="Gras App" content="Built by Gras Cannabis Co." />
			</Head>
			<Card className={twMerge(styles.cartContainer)}>
				<H3 className="absolute px-8">Bag</H3>
				<RenderCart />
				{bagIsEmpty || (
					<CheckoutButton
						size="lg"
						disabled={bagIsEmpty}
						onClick={checkoutOrCompleteSignUp}
					/>
				)}
			</Card>
		</Page>
	);
}

CartPage.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default CartPage;

const styles = {
	cartContainer:
		'bg-transparent m-auto shadow-none bg-transparent h-[320px] md:max-w-[540px] lg:max-w-[660px] sm:shadow sm:bg-light sm:w-1/2 flex flex-col lg:px-8 py-4 space-y-8',
};
