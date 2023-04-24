import Price from "@cd/ui-lib/src/components/Price";
import { H5, Paragraph } from "@cd/ui-lib/src/components/Typography";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

type CartListProps = {
    cart: Cart;
    cartError: string;
    setExpandWidget: (expandWidget: boolean) => void;
}

export type Cart = {
    total: number; 
    cartItems: CartItem[]
}

export type CartItem = {
    name: string;
    basePrice: number;
    size: number;
    unit: string;
    images: {
        id?: string
        location: string
        variantId?: string
        blurhash?: string | null
        createdAt?: Date
        updatedAt?: Date
    }[];
    quantity: number;

    id?: string
    sku?: number | null
    organizationId?: string
    organizationName?: string
    productId?: string
    discount?: number
    currency?: string
    stock?: number
    createdAt?: Date
    updatedAt?: Date
}

function CartList({cart, cartError, setExpandWidget} : CartListProps) {

    const [cookies, setCookie] = useCookies(['gras-cart-token'])
   
    function createCheckoutCookie() {
        if (cart && !cartError) {
            const cartAsString = JSON.stringify(cart)
            var expires = new Date();
            expires.setDate(expires.getDate() + 1);

            document.cookie = `gras-cart-token=${cartAsString};expires=${expires.toUTCString()};`
            // setCookie('gras-cart-token', cartAsString)
            console.info('gras-cart-token cookie created.')
        }
    }

    useEffect(() => {
        createCheckoutCookie()
    }, [])

    const styles = {
        cartGrid: "w-fit m-auto gap-8 grid grid-flow-row grid-cols-2 grid-rows-2 flex grow items-stretch justify-stretch"
    }
    return (
        <div className='items-center space-y-1 w-3/4 m-auto'>
        <Paragraph className='text-light text-lg'>
            Here is your delivery order. If you wish to make changes, edit the{' '}
            <a onClick={() => setExpandWidget(false)} className="cursor-pointer border-2 border-b-secondary">
                Dispensary Cart</a>
                , and return here for checkout.
            </Paragraph>
        <div className={styles.cartGrid}>
            {cart.cartItems.length > 0 && cart.cartItems.map((cartItem, index) => (
                <CartItem  key={`cart-item-${index}`} cartItem={cartItem} />
            )) || <Paragraph className='text-light'>Your cart is empty.</Paragraph>
            }
        </div>
        {cart && <H5 className='flex justify-end text-light'>{`Your total is `}
        <Price className={'pl-2 pr-8'} price={cart.total} /></H5>}
        {cartError && <Paragraph>{cartError}</Paragraph>}
        </div>
    );
}

const CartItem = ({ cartItem }: {cartItem: CartItem}) => {
    return (
        <div className='grid-item grow w-fit flex flex-col items-stretch justify-stretch grow'>
            <img src={cartItem.images[0].location} className="h-[80px] w-[80px] rounded" />
            <div className="flex flex-row justify-between space-x-2">
                <Paragraph className='text-light'>{cartItem.name}</Paragraph>
                <Paragraph className='text-light'>{cartItem.size}{cartItem.unit}</Paragraph>
            </div>
            <div className='text-light'><Price price={cartItem.basePrice} /></div>
        </div>
    )
}

export default CartList;