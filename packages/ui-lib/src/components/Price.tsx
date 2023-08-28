import { calcSalePrice, convertCentsToDollars } from '@cd/core-lib';
import { twMerge } from 'tailwind-merge';
import { Paragraph } from './Typography';

type PriceProps = {
	basePrice: number;
	salePrice?: number;
	discount?: number;
	quantity?: number;
	className?: string;
	locale?: string; // country
	showDiscount?: boolean;
	showOriginalPrice?: boolean;
	color?: 'light' | 'dark';
	useStaticQuantity?: boolean;
};

function Price({
	basePrice,
	salePrice,
	discount = 0,
	quantity = 1,
	className,
	showDiscount = false,
	showOriginalPrice = false,
	color = 'dark',
	locale = 'en-us',
	useStaticQuantity = false,
}: PriceProps) {
	quantity = useStaticQuantity ? 1 : quantity; // IMPORTANT

	const _currencySymbol: any = { 'en-us': '$' };
	const base = basePrice * quantity;
	const toDollars = (value: number): string => convertCentsToDollars(value);

	// discount is a flat number representing percentage off
	function computeSalePrice() {
		let _salePrice: number;
		const _discount = discount;

		if (salePrice) _salePrice = salePrice * quantity;
		else _salePrice = calcSalePrice(basePrice, _discount) * quantity;

		return _salePrice;
	}

	return (
		<div className={twMerge('flex flex-row space-x-2 pl-2', className)}>
			{showOriginalPrice && (
				<Paragraph color={color} className="text-accent line-through">
					{_currencySymbol[locale] + toDollars(base)}
				</Paragraph>
			)}

			{showDiscount && discount > 0 && (
				<Paragraph color={color} className="text-accent">
					`${discount}% off`
				</Paragraph>
			)}

			<Paragraph color={color}>
				{_currencySymbol[locale] + toDollars(computeSalePrice())}
			</Paragraph>
		</div>
	);
}

export default Price;
