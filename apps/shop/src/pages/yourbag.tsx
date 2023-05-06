import { selectCartState } from '@cd/core-lib';
import { Button, Card, H3, Page } from '@cd/ui-lib';
import RenderCart from 'components/cart/RenderCart';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

function CartPage() {
    const router = useRouter()
    const checkout = () => { router.push("/checkout"); }
    
    const { totalItems } = useSelector(selectCartState);
    return (
        <Page>
            <Card className={twMerge(styles.cartContainer)}>
                <H3 className="px-8">Your Bag</H3>
                <RenderCart />
                <Button onClick={checkout}
                disabled={totalItems < 1}>Checkout</Button>
            </Card>
        </Page>
    );
}

export default CartPage;

const styles = {
    cartContainer: 'min-w-full flex flex-col lg:px-8',
};