import { selectCartState } from '@cd/core-lib';
import { ProductVariantWithDetails } from '@cd/data-access';
import { Grid, H5, H6, ProductItem } from '@cd/ui-lib';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import RenderTotal from './RenderTotal';

function RenderCart() {
    const { cart } = useSelector(selectCartState);
                
    return (
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
        <RenderTotal /> 
        </Grid>
        );
}

export default RenderCart

const styles = {
    cartGrid: 'p-8 grid grid-cols-2 items-stretch gap-2 md:gap-8 md:w-full m-auto',
};