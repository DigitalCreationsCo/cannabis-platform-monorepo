"use client"
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { type ProductVariantWithDetails } from '@gras/data-access';
import { useState, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Price from './Price';
import TextField from './TextField/TextField';
import { H6, Paragraph } from './Typography';
import Button from './button/Button/Button';
import FlexBox from './FlexBox';
import { type ReactNode } from 'react';
import { Modal } from '@mantine/core';

interface ProductItemProps {
	className?: string;
	data: ProductVariantWithDetails;
	handleConfirm?: any;
}
function ProductItem({
	data: product,
	className,
	handleConfirm,
}: ProductItemProps & PropsWithChildren) {
	const [openConfirm, setOpenConfirm] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const toggleConfirm = () => setOpenConfirm((state) => !state);

	return (
		<>
			<div
				className={twMerge(
					'w-full border-b-2 flex flex-row col-span-2 lg:col-span-2 xl:col-span-1 justify-stretch',
					className
				)}
				// onClick={toggleConfirm}
			>
				{product?.images?.[0]?.location ? (
					<img
						src={product?.images?.[0]?.location}
						alt={product.name}
						style={{ height: 80, maxHeight: 100, width: 80, maxWidth: 100 }}
						className="rounded border object-cover place-self-center"
					/>
				) : null}
				<div className="grid w-full p-4">
					<H6 className="flex flex-row">
						{product.name} ({product.quantity})
					</H6>
					<Paragraph className="place-self-end">
						{product.size + product.unit}
					</Paragraph>
					<Price
						className="justify-end"
						basePrice={product.basePrice}
						salePrice={product.salePrice}
						discount={product.discount}
						quantity={product.quantity}
						isDiscount={product.isDiscount}
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
					max={product.stock}
					className="w-[66px] font-semibold"
					type="number"
					value={quantity}
					onChange={(event) =>
						setQuantity(
							(event.target as HTMLInputElement).value as unknown as number
						)
					}
				/>
			</ConfirmationModal>
		);
	}
}

export default ProductItem;

// OLD MARKUP BEFORE COMPONENT CART CHANGES, KEEP FOR REFERENCE
//             import { ProductVariantWithDetails } from '@gras/data-access';
// import { ConfirmationModal, FlexBox, Paragraph, Price, TextField } from '@gras/ui';
// import Image from 'next/image';
// import { PropsWithChildren, useState } from 'react';
// import { twMerge } from 'tailwind-merge';

// type ProductItemProps = {
//     className?: string;
//     product: ProductVariantWithDetails;
//     handleConfirm?: any;
// };
// function ProductItem({ product, className, handleConfirm }: ProductItemProps & PropsWithChildren) {
//     const [openConfirm, setOpenConfirm] = useState(false);
//     const [quantity, setQuantity] = useState(1);
//     const toggleConfirm = () => setOpenConfirm((state) => !state);
//     return (
//         <>
//             <div
//                 onClick={toggleConfirm}
//                 // onKeyUp={() => {}}
//                 className={twMerge(
//                     'flex flex-col justify-between bg-light h-full min-w-[180px] rounded-btn shadow',
//                     className
//                 )}
//             >
//                 <div className="relative h-1/2 h-[100px] w-[100px]">
//                     <Image className="rounded-btn" src={product?.images[0]?.location} alt="" fill={true} />
//                 </div>
//                 <div className="pb-2 pl-2">
//                     <Paragraph>{product.name}</Paragraph>

//                     {/* ADD PRODUCT VARIANT SELECT HERE */}

//                     <FlexBox>
//                         <Paragraph>{product.size + product.unit}</Paragraph>
//                         <Paragraph>{product.stock + ' in stock'}</Paragraph>
//                     </FlexBox>
//                     <FlexBox>
//                         <Price price={product.basePrice} />
//                         <Paragraph>{product.discount}% off</Paragraph>
//                     </FlexBox>
//                     {/* <H6>
//                         <Price price={product.salePrice} />
//                     </H6> */}
//                 </div>
//             </div>

//             <ConfirmationModal
//                 description={`Confirm add ${product.name}?`}
//                 open={openConfirm}
//                 handleConfirm={() => handleConfirm(product, quantity)}
//                 confirmMessage={'Add Product'}
//                 onClose={toggleConfirm}
//             >
//                 <TextField
//                     label="Quantity"
//                     max={product.stock}
//                     className="w-[66px] font-semibold"
//                     type="number"
//                     value={quantity}
//                     defaultValue={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                 />
//             </ConfirmationModal>
//         </>
//     );
// }

// export default ProductItem;


// interface ConfirmationModalProps extends ModalProps {
// 	confirmMessage?: string;
// 	handleConfirm: () => void;
// 	children?: ReactNode;
// }

function ConfirmationModal({
	description = 'Confirm?',
	confirmMessage = 'Yes',
	handleConfirm,
	children,
	...props
}: any) {
	return (
		<Modal {...props} className="text-center" description={description}>
			<FlexBox className="flex-col space-y-4">
				{children}
				<FlexBox className="justify-center">
					<Button className="" onClick={props.onClose}>
						No
					</Button>
					<Button
						className=""
						onClick={() => {
							handleConfirm();
							props.onClose();
						}}
					>
						{confirmMessage}
					</Button>
				</FlexBox>
			</FlexBox>
		</Modal>
	);
}
