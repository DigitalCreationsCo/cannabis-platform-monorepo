import { ProductVariantWithDetails } from '@cd/data-access';
import { selectCartState } from '@cd/shared-lib';
import { Card, H3, Page, ProductItem } from '@cd/ui-lib';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

function CartPage() {
    const { cart } = useSelector(selectCartState);
    const styles = {
        cartContainer: 'min-w-full'
    };
    return (
        <Page>
            <Card className={twMerge(styles.cartContainer)}>
                <H3>Your Bag</H3>
                {cart.map((item) => (
                    <ProductItem key={item.id} product={item as unknown as ProductVariantWithDetails} />
                ))}
            </Card>
        </Page>
    );
}

export default CartPage;
