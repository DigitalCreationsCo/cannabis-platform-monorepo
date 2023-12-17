import {
	cartActions,
	getShopSite,
	isLegalAgeAndVerified,
	modalActions,
	modalTypes,
	selectCartState,
	selectIsAddressAdded,
	selectIsCartEmpty,
	selectUserState,
	TextContent,
	type SimpleCart,
	crypto,
} from '@cd/core-lib';
import { type ProductVariantWithDetails } from '@cd/data-access';
import {
	Card,
	Center,
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
import { type NextPageContext } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createClient } from 'redis';
import { twMerge } from 'tailwind-merge';

function QuickDelivery({ simpleCart }: { simpleCart: SimpleCart }) {
	const dispatch = useDispatch();
	const cart = useSelector(selectCartState);
	const cartIsEmpty = useSelector(selectIsCartEmpty);
	const isAddressAdded = useSelector(selectIsAddressAdded);

	const user = useSelector(selectUserState);
	const { isLegalAge, idVerified } = user.user;

	if (idVerified === true && isLegalAge === false)
		router.push('/sorry-we-cant-serve-you');

	const [confirm, setConfirm] = useState(true);
	const canProceed = !cartIsEmpty && confirm;

	useEffect(() => {
		if (simpleCart) {
			dispatch(cartActions.saveSimpleCart(simpleCart) as unknown as AnyAction);
		}
	}, [simpleCart]);

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

	return (
		<Page
			className={twMerge(
				styles.gradient,
				'overflow-x-hidden',
				'flex flex-col pb-0',
				confirm ? 'md:!pb-0' : 'md:pb-12',
			)}
		>
			<Head>
				<title>Grascannabis.org - Cannabis, Delivered.</title>
				<meta
					name="Delivery by Gras App"
					content="Built by Gras Cannabis Co."
				/>
			</Head>
			<Card className="bg-inverse-soft m-auto flex grow flex-col">
				<H2>{TextContent.info.CANNABIS_DELIVERED}</H2>
				<Center className="m-auto flex w-full !grow flex-col py-0 sm:w-[380px] md:w-fit space-y-2">
					{/* <Paragraph className="place-self-start text-left">
						Before we deliver to you,
						<br />
						let's make sure your order is correct.
					</Paragraph> */}
					{/* <H5 className="place-self-start">{TextContent.shop.YOUR_ORDER}</H5> */}
					<H5 className="place-self-start">Review your order</H5>
					{cartIsEmpty ? (
						<Paragraph className="col-span-2 ">
							{TextContent.info.THANK_YOU}
							{'\n'}
							There are no items in your order. {'\n'}
							Please visit your Dispensary website to place an order.
						</Paragraph>
					) : (
						<>
							<div className="flex grow grid-cols-2 flex-col gap-2 md:grid">
								{cart.cart?.map(
									(product: ProductVariantWithDetails, index: number) => (
										<SimpleCartItem
											// className="text-dark"
											key={`order-item-${index}`}
											product={product}
										/>
									),
								)}
							</div>
							<div className="md:justify-end md:w-full">
								<H5 className="flex w-full justify-end leading-none">
									subtotal
									<Price basePrice={cart.subtotal || 0} />
								</H5>
								<H5 className="flex w-full justify-end leading-none">
									taxes
									<Price basePrice={cart.taxAmount || 0} />
								</H5>
								<H5 className="flex w-full justify-end leading-none">
									Your total is
									<Price basePrice={cart.total || 0} />
								</H5>
							</div>

							{/* <Paragraph>Is your order correct?</Paragraph>
							<CheckBox
								name="confirm-order"
								checked={confirm}
								label={confirm ? `It's correct` : `No, it's not`}
								onChange={() => setConfirm(!confirm)}
							/> */}
							{user.isSignedIn ? (
								<>
									<Paragraph>{TextContent.prompt.REVIEW_CHECKOUT}</Paragraph>
									<CheckoutButton
										size="lg"
										disabled={!canProceed}
										onClick={checkoutOrCompleteSignUp}
									/>
								</>
							) : (
								<>
									<Paragraph>
										That's great! Except, we dont have your info. {'\n'}
										<b>Please sign in</b>, so our{' '}
										<span className="text-primary">DeliveryPerson</span> can get
										to you.
									</Paragraph>
									<SignInButton size="lg" />
								</>
							)}
						</>
					)}
				</Center>
			</Card>
		</Page>
	);
}

export default QuickDelivery;

QuickDelivery.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

const styles = {
	gradient: [
		'bg-gradient-to-b',
		'from-primary',
		'to-secondary',
		'p-0 lg:p-16 h-max',
	],
};

export async function getServerSideProps({ query }: NextPageContext) {
	try {
		if (!query.cart) return { notFound: true };
		const key = query['cart'] as string;

		const redis = createClient({
			socket: {
				host: process.env.REDIS_TRANSFER_CART,
				port: Number(process.env.REDIS_TRANSFER_CART_PORT),
			},
			password: process.env.REDIS_TRANSFER_CART_PASSWORD,
		});
		redis.on('error', (error: any) => {
			console.error('Redis Error', error);
			throw new Error(error.message);
		});
		redis.on('node error', (error: any) => {
			console.error('Redis Node Error', error);
			throw new Error(error.message);
		});

		redis.connect();

		const tokenCipher = await redis.get(key);
		const token = tokenCipher ? crypto.decrypt(tokenCipher) : null;
		redis.disconnect();

		if (!token) return { notFound: true };
		return { props: { simpleCart: JSON.parse(token) } };
	} catch (error) {
		console.error('quickDelivery: ', error.message);
		return { notFound: true };
	}
}
