import { type SimpleCart } from '@cd/core-lib/src/types/redux.types';
import SimpleCartItem from '@cd/ui-lib/src/components/cart/SimpleCartItem';
import { Paragraph, Small } from '@cd/ui-lib/src/components/Typography';

type CartListProps = {
	cart: SimpleCart;
	cartError: string;
	setExpandWidget: (expandWidget: boolean) => void;
	setIsScrolledToBottom: (isScrolledToBottom: boolean) => void;
	staticQuantity?: boolean;
};

function CartList({ cart, cartError, staticQuantity = false }: CartListProps) {
	return (
		<>
			{cart.cartItems.length > 0 ? (
				cart.cartItems.map((cartItem, index) => (
					<>
						<SimpleCartItem
							key={`cart-item-${index}`}
							product={cartItem}
							staticQuantity={staticQuantity}
							className="text-light"
						/>
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
