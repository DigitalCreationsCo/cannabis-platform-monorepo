// import { type ProductVariantWithDetails } from '@cd/data-access';
import React, { type PropsWithChildren, useState } from 'react';
import { Image, TextInput } from 'react-native';
import Price from './Price';
import { Text, View } from './Themed';

type ProductItemProps = {
	// product: ProductVariantWithDetails;
	product: any;
	handleConfirm?: any;
};
function ProductItem({
	product,
	handleConfirm,
}: ProductItemProps & PropsWithChildren) {
	const [openConfirm, setOpenConfirm] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const toggleConfirm = () => setOpenConfirm((state) => !state);

	// console.info('product image source: ', product?.images?.[0]?.location)

	return (
		<>
			<View onResponderStart={toggleConfirm}>
				<Image
					source={product?.images?.[0]?.location as any}
					style={{ height: 100, maxHeight: 100, width: 100, maxWidth: 100 }}
				/>
				<View>
					<Text>
						{product.name} ({product.quantity})
					</Text>
					<Text>{product.size + product.unit}</Text>
					<Price
						basePrice={product.basePrice}
						salePrice={product.salePrice}
						discount={product.discount}
						quantity={product.quantity}
						showDiscount
					/>
				</View>
			</View>
			{/* <ProductItemModal /> */}
		</>
	);

	// function ProductItemModal() {
	// 	return (
	// 		<ConfirmationModal
	// 			description={`Confirm add ${product.name}?`}
	// 			modalVisible={openConfirm}
	// 			handleConfirm={() => handleConfirm(product, quantity)}
	// 			confirmMessage={'Add Product'}
	// 			onClose={toggleConfirm}
	// 		>
	// 			<TextInput
	// 				// label="Quantity"
	// 				// maxNumber={product.stock}
	// 				// type="number"
	// 				// value={quantity}
	// 				onChange={(event) =>
	// 					setQuantity(event.target.valueOf as unknown as number)
	// 				}
	// 			/>
	// 		</ConfirmationModal>
	// 	);
	// }
}

export default ProductItem;
