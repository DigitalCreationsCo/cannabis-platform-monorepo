import { selectCartState } from '@cd/core-lib/reduxDir';
import { ProductVariantWithDetails } from '@cd/data-access';
import { Button, H3, H5, H6 } from '@cd/ui-lib';
import axios from 'axios';
import { useFormContext } from 'components';
import { useSelector } from 'react-redux';
import CartItem from './cart/CartItem';


function ReviewOrder() {

    const { cart } = useSelector(selectCartState);

    const { formData } = useFormContext();

    const createStripeCheckout = async () => { 
        console.log(' client side formData: ', formData)
        await axios.post('/api/checkout-session', formData)
     }
    
    const styles = {
        cart: 'p-8 items-center flex flex-col'
    };
    
    return (
            <>
                <H3>Nice! You're ready to checkout!</H3>
                <H5>Make sure you have what you need, then hit Checkout to start your delivery.</H5>
                
                {cart.length > 0 
                ? cart.map(
                    (item) => <CartItem key={`bag-item-${item.id}`} product={item as unknown as ProductVariantWithDetails} />)
                    : <div className={styles.cart}><H5>
                        Your bag is empty</H5>
                        <a href="/"><H6 className={'cursor-pointer border-b-2 inline-block'}>
                            What are you shopping for?</H6>.</a></div>}
                            
                <Button onClick={createStripeCheckout} disabled={cart.length < 1}>
                    Checkout</Button>
            </>
    );
}

export default ReviewOrder