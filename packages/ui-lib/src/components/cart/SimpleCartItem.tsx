import { ProductVariantWithDetails } from "@cd/data-access";
import Price from "../Price";
import { H6, Paragraph } from "../Typography";

function SimpleCartItem({product}: {product: ProductVariantWithDetails}) {
    return (
        <div className="flex flex-nowrap space-x-2 items-center p-4 rounded justify-between">
            <H6 className='flex flex-row flex-nowrap'>{product.name} ({product.quantity})</H6>
            <Paragraph>{product.size + product.unit}</Paragraph>
            <Price 
            basePrice={product.basePrice} 
            salePrice={product.salePrice}
            discount={product.discount}
            quantity={product.quantity}
            />
        </div>
    );
}

export default SimpleCartItem;