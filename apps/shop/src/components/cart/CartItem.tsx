import { ProductVariantWithDetails } from '@cd/data-access';
import { ConfirmationModal, FlexBox, Paragraph, Price, ProductItem, TextField } from '@cd/ui-lib';

import Image from 'next/image';
import { PropsWithChildren, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type CartItemProps = {
    className?: string;
    product: ProductVariantWithDetails;
    handleConfirm?: any;
    editable?: boolean;

};

function CartItem({ product, className, editable = false, handleConfirm }: CartItemProps & PropsWithChildren) {

    const [edit, setEdit] = useState(false);

    const [quantity, setQuantity] = useState(1);
    // const [quantity, setQuantity] = useState(product.quantity);

    return (
        <>
            <ProductItem product={product} />

            <ConfirmationModal
                description={`Edit ${product.name}`}
                modalVisible={openConfirm}
                handleConfirm={() => handleConfirm(product, quantity)}
                confirmMessage={'Add Product'}
                onClose={toggleConfirm}
        >
                <TextField
                    label="Quantity"
                    maxNumber={product.stock}
                    className="w-[66px] font-semibold"
                    type="number"
                    value={quantity}
                    defaultValue={quantity}
                    onChange={(event) => setQuantity((event.target as HTMLInputElement).value as unknown as number)}
                />
            </ConfirmationModal>
        </ProductItem>
    );
}

export default CartItem