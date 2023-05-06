import { selectCartState } from '@cd/core-lib';
import { Button, Card, Grid, H3, Page } from '@cd/ui-lib';
import RenderCart from 'components/cart/RenderCart';
import RenderTotal from 'components/cart/RenderTotal';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

function CartPage() {
    const router = useRouter()
    const checkout = () => { router.push("/checkout"); }
    
    const { totalItems } = useSelector(selectCartState);
    
    const styles = {
        cartContainer: 'min-w-full flex flex-col lg:px-8',
        cartGrid: 'p-8 grid grid-cols-2 items-stretch gap-2 md:gap-8 md:w-full m-auto',
        total: 'flex flex-row col-span-2 justify-end'
    };
    return (
        <Page>
            <Card className={twMerge(styles.cartContainer)}>
                <H3 className="px-8">Your Bag</H3>
                <Grid className={twMerge(styles.cartGrid)}>
                    <RenderTotal />
                    <RenderCart />
                    <RenderTotal />
                </Grid>
                <Button onClick={checkout}
                disabled={totalItems < 1}>Checkout</Button>
            </Card>
        </Page>
    );
}

export default CartPage;
