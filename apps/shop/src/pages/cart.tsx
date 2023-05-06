import { selectCartState } from '@cd/core-lib';
import { ProductVariantWithDetails } from '@cd/data-access';
import { Button, Card, Grid, H3, H5, H6, Page, Price, ProductItem } from '@cd/ui-lib';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

function CartPage() {
    const router = useRouter()
    
    const { cart, total } = useSelector(selectCartState);

    const checkout = () => { router.push("/checkout"); }
    
    const originId = Math.random() * 10000000000

    const styles = {
        cartContainer: 'min-w-full flex flex-col lg:px-8',
        cartGrid: 'p-8 grid grid-cols-2 items-stretch gap-2 md:gap-8 md:w-full m-auto'
    };
    return (
        <Page>
            <Card className={twMerge(styles.cartContainer)}>
                <H3>Your Bag</H3>
                <Grid className={twMerge(styles.cartGrid)}>
                {cart.length > 0 ? cart.map((item) => (
                    <ProductItem key={item.id || originId} product={item as unknown as ProductVariantWithDetails} />
                )): 
                    <>
                    <H5>
                        Your bag is empty</H5>
                    <a href="/">
                        <H6 className={'cursor-pointer border-b-2 inline-block'}>Find your cure</H6>.
                    </a>
                    </>
                }
                {/* <H5 className="border flex flex-row place-self-end min-w-fit col-span-2"> */}
                <H5 className="col-span-2 grid-flow-col">
                Your total is 
                <Price className="pl-2" basePrice={total} /></H5>
                </Grid>
                <Button onClick={checkout} >Checkout</Button>
            </Card>
        </Page>
    );
}

export default CartPage;
