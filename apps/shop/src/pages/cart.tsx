import { selectCartState } from '@cd/core-lib';
import { ProductVariantWithDetails } from '@cd/data-access';
import { Button, Card, H3, H5, H6, Page, ProductItem } from '@cd/ui-lib';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

function CartPage() {
    const router = useRouter()
    
    const { cart } = useSelector(selectCartState);

    const checkout = () => { router.push("/checkout"); }
    
    const styles = {
        cartContainer: 'min-w-full flex flex-col lg:px-8',
        cart: 'p-8 items-center flex flex-col'
    };
    return (
        <Page>
            <Card className={twMerge(styles.cartContainer)}>
                <H3>Your Bag</H3>
                {cart.length > 0 ? cart.map((item) => (
                    <ProductItem key={item.id} product={item as unknown as ProductVariantWithDetails} />
                )): <div 
                className={styles.cart}>
                    <H5>
                        Your bag is empty</H5>
                    <a href="/">
                        <H6 className={'cursor-pointer border-b-2 inline-block'}>Find your cure</H6>.
                    </a>
                </div>
                }
                <Button onClick={checkout} disabled={cart.length < 1}>Checkout</Button>
            </Card>
        </Page>
    );
}

export default CartPage;
