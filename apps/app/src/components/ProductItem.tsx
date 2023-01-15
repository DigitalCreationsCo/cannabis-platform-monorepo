import { ProductVariantWithDetails } from '@cd/data-access';
import { FlexBox, Paragraph, Price, TextField } from '@cd/shared-ui';
import { ConfirmationAlert } from 'components';
import Image from 'next/image';
import { PropsWithChildren, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type ProductItemProps = {
    className?: string;
    product: ProductVariantWithDetails;
    handleConfirm?: any;
};
function ProductItem({ product, className, handleConfirm, children }: ProductItemProps & PropsWithChildren) {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const toggleConfirm = () => setOpenConfirm((state) => !state);
    return (
        <>
            <div
                onClick={toggleConfirm}
                // onKeyUp={() => {}}
                className={twMerge(
                    'flex flex-col justify-between bg-light h-full min-w-[180px] rounded-btn shadow',
                    className
                )}
            >
                <div className="relative h-1/2 h-[100px] w-[100px]">
                    <Image className="rounded-btn" src={product?.images[0]?.location} alt="" fill={true} />
                </div>
                <div className="pb-2 pl-2">
                    <Paragraph>{product.name}</Paragraph>

                    {/* ADD PRODUCT VARIANT SELECT HERE */}

                    <FlexBox>
                        <Paragraph>{product.size + product.unit}</Paragraph>
                        <Paragraph>{product.stock + ' in stock'}</Paragraph>
                    </FlexBox>
                    <FlexBox>
                        <Price price={product.basePrice} />
                        <Paragraph>{product.discount}% off</Paragraph>
                    </FlexBox>
                    {/* <H6>
                        <Price price={product.salePrice} />
                    </H6> */}
                </div>
            </div>

            <ConfirmationAlert
                description={`Confirm add ${product.name}?`}
                open={openConfirm}
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
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </ConfirmationAlert>
        </>
    );
}

export default ProductItem;
