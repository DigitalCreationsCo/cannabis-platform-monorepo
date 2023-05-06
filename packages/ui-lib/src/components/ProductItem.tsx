import { ProductVariantWithDetails } from '@cd/data-access';
import { PropsWithChildren, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ConfirmationModal } from './modal';
import Price from './Price';
import TextField from './TextField';
import { H6, Paragraph } from './Typography';

type ProductItemProps = {
    className?: string;
    product: ProductVariantWithDetails;
    handleConfirm?: any;
};
function ProductItem({ product, className, handleConfirm }: ProductItemProps & PropsWithChildren) {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const toggleConfirm = () => setOpenConfirm((state) => !state);

    // console.log('product image source: ', product?.images?.[0]?.location)

    return (
        <>
            <div className={twMerge('flex flex-row col-span-2 md:col-span-1', className)}>
                <img src={product?.images?.[0]?.location} style={{ height: 100, maxHeight: 100, width: 100, maxWidth: 100 }} className='rounded border object-cover place-self-center' />
                <div className="grid w-full p-4">
                    <H6 className='flex flex-row'>{product.name} ({product.quantity})</H6>
                    <Paragraph className='place-self-end'>{product.size + product.unit}</Paragraph>
                    <Price className="justify-end"
                    basePrice={product.basePrice} 
                    salePrice={product.salePrice}
                    discount={product.discount}
                    quantity={product.quantity}
                    showDiscount
                    />
                </div>
            </div>
            <ProductItemModal />    
        </>
    );

    function ProductItemModal() {
        return (
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
        );
    }
}

export default ProductItem;

            // OLD MARKUP BEFORE COMPONENT CART CHANGES, KEEP FOR REFERENCE
            // <div
            //     onClick={toggleConfirm}
            //     // onKeyUp={() => {}}
            //     className={twMerge(
            //         'flex flex-row justify-between bg-light h-full min-w-[180px] rounded-btn shadow',
            //         className
            //     )}
            // >
            //     <div className="relative h-[100px] w-[100px]">
            //         {product?.images && product?.images[0]?.location && <Image className="rounded-btn" src={product?.images[0]?.location} alt="" fill={true} />}
            //         </div>
            //         <div className="pb-2 pl-2 grow flex flex-row">
            //             <Paragraph>{product.name}</Paragraph>
    
            //             {/* ADD PRODUCT VARIANT SELECT HERE */}
    
            //             <FlexBox>
            //                 <Paragraph>{product.size + product.unit}</Paragraph>
            //                 {product.stock && <Paragraph>{product.stock + ' in stock'}</Paragraph>}
            //             </FlexBox>
            //             <FlexBox>
            //                 <Price price={product.basePrice} />
            //                 <Paragraph>{product.discount}% off</Paragraph>
            //             </FlexBox>
            //             <H6>
            //                 <Price price={product.salePrice} />
            //             </H6>
            //         </div>
            //     </div>