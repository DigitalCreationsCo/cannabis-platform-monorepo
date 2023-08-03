import { ProductVariantWithDetails } from '@cd/data-access';
import { PropsWithChildren, useState } from 'react';
import { Image, TextInput, View } from 'react-native';
import { twMerge } from 'tailwind-merge';
import { ConfirmationModal } from './modal';
import Price from './Price';
import { H6, Paragraph } from './Typography';

type ProductItemProps = {
	className?: string;
	product: ProductVariantWithDetails;
	handleConfirm?: any;
};
function ProductItem({
	product,
	className,
	handleConfirm,
}: ProductItemProps & PropsWithChildren) {
	const [openConfirm, setOpenConfirm] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const toggleConfirm = () => setOpenConfirm((state) => !state);

	// console.info('product image source: ', product?.images?.[0]?.location)

	return (
		<>
			<View
				className={twMerge(
					'flex flex-row col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1 justify-stretch',
					className,
				)}
				onResponderStart={toggleConfirm}
			>
				<Image
					source={product?.images?.[0]?.location as any}
					style={{ height: 100, maxHeight: 100, width: 100, maxWidth: 100 }}
					className="rounded border object-cover place-self-center"
				/>
				<View className="grid w-full p-4">
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
						showDiscount
					/>
				</View>
			</View>
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
				<TextInput
					// label="Quantity"
					// maxNumber={product.stock}
					className="w-[66px] font-semibold"
					// type="number"
					// value={quantity}
					onChange={(event) =>
						setQuantity(event.target.valueOf as unknown as number)
					}
				/>
			</ConfirmationModal>
		);
	}
}

export default ProductItem;
