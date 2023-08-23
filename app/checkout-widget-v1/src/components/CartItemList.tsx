import { SimpleCart } from '@cd/core-lib/src/reduxDir/features/cart.reducer';
import SimpleCartItem from '@cd/ui-lib/src/components/cart/SimpleCartItem';
import Price from '@cd/ui-lib/src/components/Price';
import { Paragraph, Small } from '@cd/ui-lib/src/components/Typography';
import { useEffect } from 'react';

type CartListProps = {
	cart: SimpleCart;
	cartError: string;
	setExpandWidget: (expandWidget: boolean) => void;
};

function CartList({ cart, cartError, setExpandWidget }: CartListProps) {
	function createCheckoutCookie() {
		if (cart && !cartError) {
			const cartAsString = JSON.stringify(cart);

			var expires = new Date();
			expires.setDate(expires.getDate() + 1);

			document.cookie = `gras-cart-token=${cartAsString};expires=${expires.toUTCString()};`;
		}
	}

	useEffect(() => {
		createCheckoutCookie();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.cartContainer}>
				{(cart.cartItems.length > 0 &&
					cart.cartItems.map((cartItem, index) => (
						<>
							{index > 0 && <hr className="border-secondary" />}

							<SimpleCartItem key={`cart-item-${index}`} product={cartItem} />
						</>
					))) || (
					<Small className="text-light m-auto">Your cart is empty.</Small>
				)}

				{cart && (
					<Paragraph className="flex justify-end text-light">
						Your total is
						<Price
							color="light"
							className="pl-2 text-light"
							basePrice={cart.total}
						/>
					</Paragraph>
				)}
			</div>

			{cartError && <Paragraph>{cartError}</Paragraph>}
		</div>
	);
}

export default CartList;

const styles = {
	container: 'items-center space-y-1 w-full m-auto',
	cartContainer:
		'w-2/3 m-auto flex flex-col grow items-stretch justify-stretch',
};
