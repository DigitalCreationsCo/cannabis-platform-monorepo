import { type SimpleCart } from '@cd/core-lib/src/types/redux.types';
import SimpleCartItem from '@cd/ui-lib/src/components/cart/SimpleCartItem';
import { Paragraph, Small } from '@cd/ui-lib/src/components/Typography';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import styles from '../styles/theme';

type CartListProps = {
	cart: SimpleCart;
	cartError: string;
	setExpandWidget: (expandWidget: boolean) => void;
	setIsScrolledToBottom: (isScrolledToBottom: boolean) => void;
};

function CartList({ cart, cartError, setIsScrolledToBottom }: CartListProps) {
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
		<div className={twMerge(styles.cart_list)}>
			{cart.cartItems.length > 0 ? (
				<div className={'overflow-y-auto w-full'}>
					{cart.cartItems.map((cartItem, index) => (
						<>
							<SimpleCartItem key={`cart-item-${index}`} product={cartItem} />
							<div
								key={`divider-${index}`}
								className="divider text-primary m-0"
							></div>
						</>
					))}
				</div>
			) : (
				<Small className="text-light m-auto">Your cart is empty.</Small>
			)}
			{cartError && <Paragraph>{cartError}</Paragraph>}
		</div>
	);
}

export default CartList;
