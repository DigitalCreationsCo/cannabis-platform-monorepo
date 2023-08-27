import { type SimpleCart } from '@cd/core-lib/src/types/redux.types';
import SimpleCartItem from '@cd/ui-lib/src/components/cart/SimpleCartItem';
import { Paragraph, Small } from '@cd/ui-lib/src/components/Typography';
import { useEffect } from 'react';

type CartListProps = {
	cart: SimpleCart;
	cartError: string;
	setExpandWidget: (expandWidget: boolean) => void;
	setIsScrolledToBottom: (isScrolledToBottom: boolean) => void;
};

function CartList({ cart, cartError }: CartListProps) {
	// console.log('CartList cart: ', cart);

	// does this cross domain cookie work?
	// need to test across different domains!
	// and write unit tests
	useEffect(() => {
		createCheckoutCookie();
	}, []);
	function createCheckoutCookie() {
		if (cart && !cartError) {
			const cartAsString = JSON.stringify(cart);

			const expires = new Date();
			expires.setDate(expires.getDate() + 1);

			document.cookie = `gras-cart-token=${cartAsString};expires=${expires.toUTCString()};`;
		}
	}

	return (
		<>
			{cart.cartItems.length > 0 ? (
				cart.cartItems.map((cartItem, index) => (
					<>
						<SimpleCartItem key={`cart-item-${index}`} product={cartItem} />
						<div
							key={`divider-${index}`}
							className="divider text-primary m-0"
						></div>
					</>
				))
			) : (
				<Small className="text-light m-auto">Your cart is empty.</Small>
			)}
			{cartError && <Paragraph>{cartError}</Paragraph>}
		</>
	);
}

export default CartList;
