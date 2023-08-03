import {
	cartActions,
	modalActions,
	modalTypes,
	selectCartState,
	selectIsCartEmpty,
	selectUserState,
	type SimpleCart,
} from '@cd/core-lib';
import { type ProductVariantWithDetails } from '@cd/data-access';
import {
	Button,
	Center,
	H5,
	Paragraph,
	Price,
	SimpleCartItem,
	useFormContext,
} from '@cd/ui-lib';
import { type AnyAction } from '@reduxjs/toolkit';
import router from 'next/router';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

function ConfirmOrder() {
	const { nextFormStep } = useFormContext();
	const dispatch = useDispatch();

	const [cookies, , removeCookie] = useCookies(['gras-cart-token']);
	const simpleCart: SimpleCart =
		cookies['gras-cart-token'] &&
		JSON.parse(JSON.stringify(cookies['gras-cart-token']));

	const cart = useSelector(selectCartState);
	const cartIsEmpty = useSelector(selectIsCartEmpty);
	const user = useSelector(selectUserState);

	useEffect(() => {
		// console.info('simple Cart: ', simpleCart)
		if (simpleCart)
			dispatch(
				cartActions.saveSimpleCart(simpleCart) as unknown as AnyAction
			);

		removeCookie('gras-cart-token');
		console.info('gras-cart-token cookie removed.');
		// NOTE: Should encrypt this token in the future.
		// NOTE: Add the cart data to redux store at this point, and delete the cookie after this.
	}, [dispatch, removeCookie, simpleCart]);

	const checkout = () => {
		router.push('/checkout');
	};

	return (
		<Center className="m-auto w-3/4 space-y-2 pb-20 md:pb-0">
			<H5>
				Before you get your delivery,
				<br />
				Let's double check your order here.
			</H5>
			<div className="flex grid-cols-2 flex-col gap-2 md:grid">
				{(!cartIsEmpty &&
					cart.cart?.map(
						(product: ProductVariantWithDetails, index: number) => (
							<SimpleCartItem
								key={`order-item-${index}`}
								product={product}
							/>
						)
					)) || (
					<Paragraph className="col-span-2">
						You have no items in your order.
					</Paragraph>
				)}

				<H5 className="col-span-2 flex justify-end">
					Your total is
					<Price basePrice={cart.total || 0} />
				</H5>
			</div>

			{user.isSignedIn ? (
				<>
					<Paragraph>
						Hit checkout to complete your delivery order.
					</Paragraph>
					<Button onClick={checkout} disabled={!!cartIsEmpty}>
						Checkout
					</Button>
				</>
			) : (
				<>
					<Paragraph>
						We'll need your contact info and address so our delivery
						person can get to you.
					</Paragraph>
					<Paragraph>
						Hit Next to provide your info, or <i>sign in</i>
					</Paragraph>
					<Button disabled={!!cartIsEmpty} onClick={nextFormStep}>
						Next
					</Button>
					<Button onClick={openLoginModal}>Sign In</Button>
				</>
			)}
		</Center>
	);

	function openLoginModal() {
		dispatch(
			modalActions.openModal({
				modalType: modalTypes.loginModal,
			})
		);
	}
}

export default ConfirmOrder;
