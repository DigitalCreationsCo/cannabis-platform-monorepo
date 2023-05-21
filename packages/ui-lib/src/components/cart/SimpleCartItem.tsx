import { ProductVariantWithDetails } from "@cd/data-access";
import { twMerge } from "tailwind-merge";
import Price from "../Price";
import { H6, Small } from "../Typography";

function SimpleCartItem({product}: {product: ProductVariantWithDetails}) {
    return (
        <div className={twMerge(styles.lineItem)}>
            <img 
            src={product?.images?.[0]?.location} 
            style={{ height: 50, maxHeight: 50, width: 50, maxWidth: 50 }} 
            className='rounded border object-cover place-self-center' />
            
            <div className={styles.info}>
                <H6 className='flex'>
                    {product.name} ({product.quantity})</H6>
                    
                <div className="flex flex-row">
                    <Small>{product.size + product.unit}</Small>
                    <Price className="text-sm"
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

const styles = {
    lineItem: "px-2 flex flex-nowrap space-x-4 items-center rounded border justify-between cursor-default",
    info: "flex flex-col w-full min-h-[64px] justify-center"
}