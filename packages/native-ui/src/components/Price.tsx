import {
	calcSalePrice,
	convertCentsToDollars,
} from '@cd/core-lib/src/utils/transaction.util';
import { View, Text } from '@themed';

type PriceProps = {
	basePrice: number;
	salePrice?: number;
	discount?: number;
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
	showDiscount = false,
	showOriginalPrice = false,
	locale = 'en-us',
}: PriceProps) {
	const _currencySymbol: any = { 'en-us': '$' };

	const base = basePrice * quantity;

	const toDollars = (value: number): string => convertCentsToDollars(value);

	// discount is a flat number representing percentage off
	function computeSalePrice() {
		let _salePrice: number;
		const _discount = discount;
		if (salePrice) {
			_salePrice = salePrice * quantity;
		} else {
			_salePrice = calcSalePrice(basePrice, _discount) * quantity;
		}
		return _salePrice;
	}

	return (
		<View>
			{showOriginalPrice && (
				<Text>{_currencySymbol[locale] + toDollars(base)}</Text>
			)}
			{showDiscount && discount > 0 && <Text>`${discount}% off`</Text>}
			<Text>{_currencySymbol[locale] + toDollars(computeSalePrice())}</Text>
		</View>
	);
}

export default Price;
