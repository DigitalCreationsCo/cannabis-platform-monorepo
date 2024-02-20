import { calculateProductSaleAtQuantity } from '@cd/core-lib';
import { View, Text } from './Themed';

type PriceProps = {
	basePrice: number;
	salePrice?: number;
	discount?: number;
	isDiscount?: boolean;
	quantity?: number;
	locale?: string; // country
	showDiscount?: boolean;
	showOriginalPrice?: boolean;
};

function Price({
	basePrice,
	salePrice,
	discount = 0,
	quantity = 1,
	isDiscount = false,
	showDiscount = false,
	showOriginalPrice = false,
	locale = 'en-us',
}: PriceProps) {
	const _currencySymbol: any = { 'en-us': '$' };

	const base = basePrice * quantity;

	// const toDollars = (value: number): string => convertCentsToDollars(value);
	const toDollars = (value: number): string => value.toString();

	return (
		<View>
			{showOriginalPrice && (
				<Text>{_currencySymbol[locale] + toDollars(base)}</Text>
			)}
			{showDiscount && discount > 0 && <Text>`${discount}% off`</Text>}
			<Text>
				{_currencySymbol[locale] +
					toDollars(
						calculateProductSaleAtQuantity({
							basePrice,
							discount,
							salePrice,
							quantity,
							isDiscount,
						}),
					)}
			</Text>
		</View>
	);
}

export default Price;
