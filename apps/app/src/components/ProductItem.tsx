import { Price, FlexBox, H6, Paragraph, TextField } from "@cd/shared-ui";
import { Product, ProductWithDetails } from "@cd/data-access";
import Image from "next/image";
import React, { PropsWithChildren, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ConfirmationAlert } from "components";

type ProductItemProps = {
    className?: string;
    product: ProductWithDetails;
    handleConfirm?: any;
}
function ProductItem({ product, className, handleConfirm, children }: ProductItemProps & PropsWithChildren) {
    const [ openConfirm, setOpenConfirm ] = useState(false)
    const [ quantity, setQuantity ] = useState(1)
    const toggleConfirm = () => setOpenConfirm((state) => !state)
    return (
        <>
            <div onClick={toggleConfirm} className={ twMerge("flex flex-col justify-between bg-light h-full min-w-[180px] rounded-btn shadow", className) }>
                <div className="relative h-1/2 h-[100px] w-[100px]">
                    <Image className="rounded-btn" src={ product?.variants?.[0]?.images[0]?.location } alt="" fill={ true }  />
                </div>
                <div className="pb-2 pl-2">
                    <Paragraph>{ product.name }</Paragraph>
                    
                    {/* ADD PRODUCT VARIANT SELECT HERE */ }
                    
                <FlexBox>
                    {/* <Paragraph>{ product.size + product.unit }</Paragraph> */}
                    {/* <Paragraph>{ product.stock + ' in stock'}</Paragraph> */}
                </FlexBox>
                <FlexBox>
                    {/* <Price price={ product.basePrice } /> */}
                    {/* <Paragraph>{ product.discount }% off</Paragraph> */}
                </FlexBox>
                {/* <H6><Price price={ product.salePrice }  /></H6> */}
                </div>
            </div>
            
            <ConfirmationAlert
                description={`Confirm add ${product.name}?`}
                open={ openConfirm }
                handleConfirm={ () => handleConfirm(product, quantity) }
                confirmMessage={"Add Product"}
                onClose={ toggleConfirm }
            >
                <TextField
                    label="Quantity"
                    maxNumber={product.stock}
                    className="w-[66px] font-semibold"
                    type="number"
                    value={ quantity }
                    defaultValue={ quantity }
                    onChange={ (e) => setQuantity(e.target.value) }
                />
            </ConfirmationAlert>
        </>
    );
}

export default ProductItem;