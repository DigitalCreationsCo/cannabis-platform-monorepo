import { selectCartState } from '@cd/core-lib';
import { ProductVariantWithDetails } from '@cd/data-access';
import { Grid, H5, H6, ProductItem } from '@cd/ui-lib';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import RenderTotal from './RenderTotal';

function RenderCart() {
    const { cart } = useSelector(selectCartState);
                
    return (
        <div className={styles.cartContainer}>
            <RenderTotal /> 
            <Grid className={twMerge(styles.cartGrid)}>
                {cart.length > 0 ? cart.map((item, index) => (
                    <ProductItem key={`bag-item-${index}`} product={item as unknown as ProductVariantWithDetails} />
                    )) :
                    <div className='text-center col-span-2'>
                    <H5>
                        Your bag is empty</H5>
                    <a href="/">
                        <H6 className={'cursor-pointer border-b-2 inline-block'}>Find your cure</H6>
                    </a>
                    </div>}
            </Grid>
            {/* <RenderTotal />  */}
        </div>
        );
}

export default RenderCart

const styles = {
    // cartContainer: 'min-w-full flex flex-col lg:px-8',
    cartContainer: 'px-8 pb-4 space-y-4',
    cartGrid: 'grid grid-cols-2 items-stretch gap-2 md:gap-8 md:w-full m-auto',
};