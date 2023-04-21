import { ProductVariantWithDetails } from '@cd/data-access';
import Image from 'next/image';
import { PropsWithChildren, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import FlexBox from './FlexBox';
import { ConfirmationModal } from './modal';
import Price from './Price';
import TextField from './TextField';
import { Paragraph } from './Typography';

type ProductItemProps = {
    className?: string;
    product: ProductVariantWithDetails;
    handleConfirm?: any;
};
function ProductItem({ product, className, handleConfirm }: ProductItemProps & PropsWithChildren) {
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
                <div className="relative h-[100px] w-[100px]">
                    {product?.images && product?.images[0]?.location && <Image className="rounded-btn" src={product?.images[0]?.location} alt="" fill={true} />}
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

            <ConfirmationModal
                description={`Confirm add ${product.name}?`}
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
        </>
    );
}

export default ProductItem;
