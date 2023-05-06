import { selectCartState } from '@cd/core-lib';
import { ProductVariantWithDetails } from '@cd/data-access';
import { H5, H6, ProductItem } from '@cd/ui-lib';
import { useSelector } from 'react-redux';

function RenderCart() {
    const { cart } = useSelector(selectCartState);

    return <>
    {cart.length > 0 ? cart.map((item, index) => (
        <ProductItem key={`bag-item-${index}`} product={item as unknown as ProductVariantWithDetails} />
        )) :
        <div className='text-center col-span-2'>
        <H5>
            Your bag is empty</H5>
        <a href="/">
            <H6 className={'cursor-pointer border-b-2 inline-block'}>Find your cure</H6>
        </a>
        </div>}</>
    ;
}

export default RenderCart