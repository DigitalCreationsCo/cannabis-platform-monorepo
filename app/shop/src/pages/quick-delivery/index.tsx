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
import { motion } from 'framer-motion';
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

	if (isLegalAge === false || (!isLegalAge && idVerified))
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
				'flex h-full pb-0',
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
			<div className="flex grow">
				<Card className="bg-inverse-soft m-auto">
					<H2>{TextContent.info.GET_CANNABIS_DELIVERED}</H2>
					<H5>{TextContent.shop.PLACE_AN_ORDER_DELIVERY}</H5>

					<Center className="m-auto w-[380px] space-y-2 py-14 md:w-fit md:py-0">
						{!cartIsEmpty && (
							<>
								<H5>
									Before we deliver to you,
									<br />
									let's make sure your order is correct.
								</H5>
								<div className="flex grid-cols-2 flex-col gap-2 md:grid">
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
							</>
						)}

						{cartIsEmpty && (
							<Paragraph className="col-span-2 ">
								{TextContent.info.THANK_YOU}
								{'\n'}
								There are no items in your order. {'\n'}
								Please visit your Dispensary website to place an order.
							</Paragraph>
						)}

						{!cartIsEmpty && (
							<>
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
						<motion.div
							className="flex flex-col space-y-8"
							animate={confirm ? 'open' : 'closed'}
							variants={{
								open: { opacity: 1 },
								closed: { opacity: 1 },
							}}
						>
							{user.isSignedIn && canProceed && (
								<>
									<Paragraph>{TextContent.prompt.CHECKOUT_READY}</Paragraph>
									<CheckoutButton size="lg" disabled={!canProceed} />
								</>
							)}
							{!user.isSignedIn && canProceed && (
								<>
									<Paragraph>
										That's great! Except, we dont have your info. {'\n'}
										<b>Please sign in</b>, so our{' '}
										<span className="text-primary">Gras DeliveryPerson</span>{' '}
										can deliver to you.
									</Paragraph>
									<SignInButton size="lg" />
								</>
							)}
						</motion.div>
					</Center>
				</Card>
			</div>
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

	return { props: { simpleCart: JSON.parse(token) } };
}
