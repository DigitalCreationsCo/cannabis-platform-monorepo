import {
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
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { RenderCart } from '../components';

function CartPage() {
	const dispatch = useDispatch();
	const user = useSelector(selectUserState);
	const isAddressAdded = useSelector(selectIsAddressAdded);

	const router = useRouter();
	const checkoutOrSignUp = (event: any) => {
		event.preventDefault();
		event.stopPropagation();
		if (user.isSignedIn && isAddressAdded && user.user.isSignUpComplete) {
			if (!isLegalAgeAndVerified(user.user))
				router.push(getShopSite('/sorry-we-cant-serve-you'));
			else router.push('/checkout');
		} else {
			dispatch(modalActions.openModal({ modalType: modalTypes.checkoutModal }));
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
						onClick={checkoutOrSignUp}
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
		'bg-transparent mx-auto shadow-none bg-transparent sm:shadow sm:bg-light sm:w-[440px] flex flex-col lg:px-8 py-4 space-y-8',
};
