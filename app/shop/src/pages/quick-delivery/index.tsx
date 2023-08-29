import {
	cartActions,
	selectCartState,
	selectIsCartEmpty,
	selectUserState,
	TextContent,
	type SimpleCart,
} from '@cd/core-lib';
import { type ProductVariantWithDetails } from '@cd/data-access';
import {
	Card,
	Center,
	CheckBox,
	CheckoutButton,
	H2,
	H5,
	Page,
	Paragraph,
	Price,
	SignInButton,
	SimpleCartItem,
	type LayoutContextProps,
} from '@cd/ui-lib';
import { type AnyAction } from '@reduxjs/toolkit';
import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

function QuickDelivery() {
	const user = useSelector(selectUserState);
	const { isLegalAge, idVerified } = user.user;

	if (isLegalAge === false || (!isLegalAge && idVerified))
		router.push('/sorry-we-cant-serve-you');

	const dispatch = useDispatch();

	const [cookies, , removeCookie] = useCookies(['gras-cart-token']);
	console.log('cookies: ', cookies);
	const simpleCart: SimpleCart =
		cookies['gras-cart-token'] &&
		JSON.parse(JSON.stringify(cookies['gras-cart-token']));

	const cart = useSelector(selectCartState);
	const cartIsEmpty = useSelector(selectIsCartEmpty);

	useEffect(() => {
		// Add the cart token data to redux state, and delete the cookie after this.
		if (simpleCart) {
			console.log('cart cookie: ', simpleCart);
			dispatch(cartActions.saveSimpleCart(simpleCart) as unknown as AnyAction);
			removeCookie('gras-cart-token');
			console.info('gras-cart-token cookie removed.');
		}
		// NOTE: Should encrypt this token in the future.
		// }, [dispatch, removeCookie, simpleCart]);
	}, []);

	const [confirm, setConfirm] = useState(false);

	const canProceed = !cartIsEmpty && confirm;

	return (
		<Page className={twMerge(styles.gradient, 'flex h-full pb-0 md:pb-28')}>
			<Head>
				<title>Grascannabis.org - Cannabis, Delivered.</title>
				<meta
					name="Delivery by Gras App"
					content="Built by Gras Cannabis Co."
				/>
			</Head>
			<div className="flex grow">
				<Card className="bg-inverse-soft m-auto">
					<H2>{TextContent.info.GET_CANNABIS_DELIVERED}</H2>
					<H5>{TextContent.shop.PLACE_AN_ORDER_DELIVERY}</H5>

					<Center className="m-auto w-3/4 items-center space-y-2 py-14 md:py-0">
						{!cartIsEmpty && (
							<>
								<H5>
									Before we deliver your order,
									<br />
									let's get it right
								</H5>
								<div className="flex grid-cols-2 flex-col gap-2 md:grid">
									{cart.cart?.map(
										(product: ProductVariantWithDetails, index: number) => (
											<SimpleCartItem
												key={`order-item-${index}`}
												product={product}
											/>
										),
									)}
								</div>
							</>
						)}

						{cartIsEmpty && (
							<Paragraph className="col-span-2 ">
								There are no items in your order. {'\n'}
								Visit your Dispensary store to place an order.
							</Paragraph>
						)}

						{!cartIsEmpty && (
							<>
								<H5 className="col-span-2 flex justify-end">
									Your total is
									<Price basePrice={cart.total || 0} />
								</H5>

								<Paragraph>Is your order correct?</Paragraph>
								<CheckBox
									className="w-[122px]"
									checked={confirm}
									label={confirm ? `It's correct` : `No, it's not`}
									onChange={() => setConfirm(!confirm)}
								/>
							</>
						)}

						{user.isSignedIn && canProceed && (
							<>
								<Paragraph>{TextContent.prompt.CHECKOUT_READY}</Paragraph>
								<CheckoutButton disabled={!canProceed} />
							</>
						)}

						{!user.isSignedIn && canProceed && (
							<>
								<Paragraph>
									That's great, except we dont have your info. {'\n'}
									<b>Please sign in</b>, so our{' '}
									<span className="text-primary">Gras DeliveryPerson</span> can
									get to you.
								</Paragraph>
								<SignInButton />
							</>
						)}
					</Center>
				</Card>
			</div>
		</Page>
	);
}

QuickDelivery.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default QuickDelivery;

const styles = {
	gradient: [
		'bg-gradient-to-b',
		'from-primary',
		'to-secondary',
		'p-0 lg:p-16 h-max',
	],
};
