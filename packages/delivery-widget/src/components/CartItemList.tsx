type CartListProps = {
    cart: Cart;
    cartError: string;
}

export type Cart = {
    total: number; 
    cartItems: CartItem[]
}

export type CartItem = {
    name: string;
    price: number;
    weight: number;
    image: string;
    quantity: number;
}

function CartList({cart, cartError} : CartListProps) {
    return (
        <>
        Prepping your order for delivery
        {cart && cart.cartItems.map((cartItem, index) => (
            <div key={`cart-item-${index}`}>
                <img src={cartItem.image} height="50px" width="50px" />
                <h1>{cartItem.name}</h1>
                <p>{cartItem.price}</p>
                <p>{cartItem.weight}</p>
            </div>
        ))}
        {cart && <h1>{cart.total}</h1>}
        {cartError && <h1>{cartError}</h1>}
        </>
    );
}

export default CartList;