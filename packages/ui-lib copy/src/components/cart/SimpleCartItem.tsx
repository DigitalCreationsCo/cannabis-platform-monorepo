import { ProductVariantWithDetails } from "@cd/data-access";
import Price from "../Price";
import { H6, Paragraph } from "../Typography";

function SimpleCartItem({product}: {product: ProductVariantWithDetails}) {
    return (
        <div className="flex flex-nowrap space-x-2 items-center p-4 rounded border justify-between">
            <img src={product?.images?.[0]?.location} style={{ height: 50, maxHeight: 50, width: 50, maxWidth: 50 }} className='rounded border object-cover place-self-center' />
            <div className="flex flex-col w-full">
                <H6 className='flex'>{product.name} ({product.quantity})</H6>
                <div className="flex flex-row">
                    <Paragraph>{product.size + product.unit}</Paragraph>
                    <Price 
                    basePrice={product.basePrice} 
                    salePrice={product.salePrice}
                    discount={product.discount}
                    quantity={product.quantity}
                    /></div>
            </div>
        </div>
    );
}

export default SimpleCartItem;