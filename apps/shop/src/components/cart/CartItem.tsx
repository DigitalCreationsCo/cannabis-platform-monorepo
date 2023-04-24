import { ProductVariantWithDetails } from '@cd/data-access';
import { IconButton, Icons, ProductItem } from '@cd/ui-lib';

import { PropsWithChildren, useState } from 'react';

type CartItemProps = {
    className?: string;
    product: ProductVariantWithDetails;
    handleConfirm?: any;
    editable?: boolean;

};

function CartItem({ product, className, editable = false, handleConfirm }: CartItemProps & PropsWithChildren) {
    const [quantity, setQuantity] = useState(product.quantity);

    return (
        <>
        <IconButton Icon={Icons.Subtract} />
        <ProductItem product={product} />
        <IconButton Icon={Icons.Add} />
        </>
    );
}

export default CartItem