
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
        <p className="whitespace-pre-line">
            We've got your order ready for delivery. 
            If you'd like to make any changes, please do so on the checkout page.
            </p>
        <div className="m-auto gap-8 grid grid-flow-row grid-cols-2 grid-rows-2">
        {cart && cart.cartItems.map((cartItem, index) => (
            <div key={`cart-item-${index}`}>
                <div>
                <img src={cartItem.image} className="object-scale-down max-h-[50px] max-w-[50px] rounded" />
                </div>
                <div className="flex flex-row justify-between space-x-2">
                    <h1>{cartItem.name}</h1>
                    <p>{cartItem.weight}</p>
                </div>
                <p>{cartItem.price}</p>
            </div>
        ))}
        </div>
        {cart && <h1>{cart.total}</h1>}
        {cartError && <h1>{cartError}</h1>}
        </>
    );
}

// function CartList({cart, cartError} : CartListProps) {
//     return (
//         <>
//         Prepping your order for delivery
//         {cart && cart.cartItems.map((cartItem, index) => (
//             <div key={`cart-item-${index}`}>
//                 <img src={cartItem.image} height="50px" width="50px" />
//                 <h1>{cartItem.name}</h1>
//                 <p>{cartItem.price}</p>
//                 <p>{cartItem.weight}</p>
//             </div>
//         ))}
//         {cart && <h1>{cart.total}</h1>}
//         {cartError && <h1>{cartError}</h1>}
//         </>
//     );
// }

export default CartList;