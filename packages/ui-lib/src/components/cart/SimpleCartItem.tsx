import { ProductVariantWithDetails } from "@cd/data-access";
import { H6, Paragraph, Price } from "@cd/ui-lib";

function SimpleCartItem({product}: {product: ProductVariantWithDetails}) {
    return (
        <div className="border flex space-x-2 items-center p-4 rounded justify-between">
                <H6>{product.name}</H6>
                <Paragraph>{product.size + product.unit}</Paragraph>
                <Price price={product.salePrice || product.basePrice} />
            </div>
    );
}

export default SimpleCartItem;