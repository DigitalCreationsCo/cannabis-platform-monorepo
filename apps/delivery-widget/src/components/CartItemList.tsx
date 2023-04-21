import { H5, Paragraph } from "@cd/ui-lib/src/components/Typography";

type CartListProps = {
    cart: Cart;
    cartError: string;
    setShowCart: () => void;
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

function CartList({cart, cartError, setShowCart} : CartListProps) {
    const styles = {
        cartGrid: "w-fit m-auto text-light gap-8 grid grid-flow-row grid-cols-2 grid-rows-2 flex grow items-stretch justify-stretch"
    }
    return (
        <div className='items-center space-y-1 w-3/4 m-auto'>
        <Paragraph className='text-light text-lg'>
            Here is your delivery order. If you wish to make changes, edit the{' '}
            <a onClick={setShowCart} className="cursor-pointer border-2 border-b-secondary">
                Dispensary Cart</a>
                , and return here for checkout.
            </Paragraph>
        <div className={styles.cartGrid}>
            {cart.cartItems.length > 0 && cart.cartItems.map((cartItem, index) => (
                <CartItem  key={`cart-item-${index}`} cartItem={cartItem} />
            )) || <Paragraph className='text-light'>You </Paragraph>
            }
        </div>
        {cart && <H5 className='flex justify-end text-light'>Your total is {cart.total}</H5>}
        {cartError && <Paragraph>{cartError}</Paragraph>}
        </div>
    );
}

const CartItem = ({ cartItem }: {cartItem: CartItem}) => {
    return (
        <div className='grid-item grow w-fit flex flex-col items-stretch justify-stretch grow'>
            <img src={cartItem.image} className="object-scale-down max-h-[50px] max-w-[50px] rounded" />
            <div className="flex flex-row justify-between space-x-2">
                <Paragraph className='text-light'>{cartItem.name}</Paragraph>
                <Paragraph className='text-light'>{cartItem.weight}</Paragraph>
            </div>
            <Paragraph className='text-light'>{cartItem.price}</Paragraph>
        </div>
    )
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