import { ProductVariantWithDetails } from '@cd/data-access';
import { Button, Card, H3, H5, H6, Page, ProductItem } from '@cd/ui-lib';
import axios from 'axios';
import { useFormContext } from 'components';
import { useCookies } from 'react-cookie';
import { twMerge } from 'tailwind-merge';

function ConfirmOrder() {
    const { formData } = useFormContext();
    
    const [cookies, setCookie] = useCookies(['gras-cart-token'])
    
    const cart = cookies["gras-cart-token"] && JSON.parse(JSON.stringify(cookies["gras-cart-token"])) as OrderItem || null
    console.log('cart: ', cart) 

    const createStripeCheckout = async () => { 
        console.log(' client side formData: ', formData)
        await axios.post('/api/checkout-session', formData)
     }
    
    const styles = {
        cartContainer: 'flex flex-col lg:px-8 justify-center max-w-fit m-auto border',
        cart: 'p-8 items-center flex flex-col'
    };
    
    return (
        <Page>
            <Card className={twMerge(styles.cartContainer)}>
                <H3>Nice! You're ready to checkout!</H3>
                <H5>Make sure you have what you need, then hit Checkout to start your delivery.</H5>
                
                {cart.length > 0 ? cart.map((item) => (
                    <ProductItem key={item.id} product={item as unknown as ProductVariantWithDetails} />
                )): <div className={styles.cart}><H5>
                        Your bag is empty</H5>
                    <a href="/"><H6 className={'cursor-pointer border-b-2 inline-block'}>
                        What are you shopping for?</H6>.</a></div>
                }
                <Button onClick={createStripeCheckout} disabled={cart.length < 1}>Checkout</Button>
            </Card>
        </Page>
    );
}

export default ConfirmOrder