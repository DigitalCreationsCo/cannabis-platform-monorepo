import {
	cartActions,
	crypto,
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
import { type NextPageContext } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import redisCheckout from '../../lib/redis';

function QuickDelivery({ simpleCart }: { simpleCart: SimpleCart }) {
	const dispatch = useDispatch();
	const cart = useSelector(selectCartState);
	const cartIsEmpty = useSelector(selectIsCartEmpty);

	const user = useSelector(selectUserState);
	const { isLegalAge, idVerified } = user.user;

	if (idVerified === true && isLegalAge === false)
		router.push('/sorry-we-cant-serve-you');

	const [confirm, setConfirm] = useState(false);
	const canProceed = !cartIsEmpty && confirm;

	useEffect(() => {
		if (simpleCart) {
			dispatch(cartActions.saveSimpleCart(simpleCart) as unknown as AnyAction);
		}
	}, [simpleCart]);

	return (
		<Page
			className={twMerge(
				styles.gradient,
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
				<H2>{TextContent.info.GET_CANNABIS_DELIVERED}</H2>
				<Center className="m-auto flex w-full !grow flex-col space-y-2 py-0 sm:w-[380px] md:w-fit">
					<Paragraph className="place-self-start text-left">
						Before we deliver to you,
						<br />
						let's make sure your order is correct.
					</Paragraph>
					<H5 className="place-self-start">{TextContent.shop.YOUR_ORDER}</H5>
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
							<H5 className="flex w-full justify-end">
								Your total is
								<Price basePrice={cart.total || 0} />
							</H5>
							<Paragraph>Is your order correct?</Paragraph>
							<CheckBox
								name="confirm-order"
								className="w-[122px]"
								checked={confirm}
								label={confirm ? `It's correct` : `No, it's not`}
								onChange={() => setConfirm(!confirm)}
							/>
						</>
					)}

					{canProceed &&
						(user.isSignedIn ? (
							<>
								<Paragraph>{TextContent.prompt.REVIEW_CHECKOUT}</Paragraph>
								<CheckoutButton size="lg" disabled={!canProceed} />
							</>
						) : (
							<>
								{/* <motion.div
						className="flex grow flex-col space-y-8"
						animate={confirm ? 'open' : 'closed'}
						variants={{
							open: { opacity: 1 },
							closed: { opacity: 1 },
						}}
					> */}
								<Paragraph>
									That's great! Except, we dont have your info. {'\n'}
									<b>Please sign in</b>, so our{' '}
									<span className="text-primary">Gras DeliveryPerson</span> can
									deliver to you.
								</Paragraph>
								<SignInButton size="lg" />
								{/* </motion.div> */}
							</>
						))}
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
	if (!query.cart) return { notFound: true };

	const tokenCipher = await redisCheckout.get(query['cart'] as string);
	const token = tokenCipher ? crypto.decrypt(tokenCipher) : null;

	if (!token) return { notFound: true };

	console.info('token', token);
	return { props: { simpleCart: JSON.parse(token) } };
}
