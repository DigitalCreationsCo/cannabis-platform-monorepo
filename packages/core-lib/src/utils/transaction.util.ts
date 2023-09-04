import { type OrderStatus, type OrderWithDetails } from '@cd/data-access';

const orderStatusList: OrderStatus[] = [
	'Pending',
	'Processing',
	'Delivered',
	'Cancelled',
];

/**
 * returns the order status as a boolean
 * @param order
 * @returns
 */
const checkOrderIsCompleteOrCanceled = (order: OrderWithDetails) =>
	order.orderStatus === 'Cancelled' || order.orderStatus === 'Delivered';

/**
 * calculates the price of an item after discount
 * @param price
 * @param discount a flat number representing percentage off
 * @returns
 */
function calcSalePrice(price: number, discount: number) {
	const _discountPercentage = discount / 100;
	const _price = price;
	return _price === discount * price
		? _price
		: _price - price * _discountPercentage;
}

/**
 * gets the currency symbol for a given currency code
 * @param currency
 * @returns
 */
function getCurrencySymbol(currency: any) {
	const currencySymbol = new Intl.NumberFormat('en', {
		currency,
		style: 'currency',
	})
		.formatToParts(0)
		.find((part) => part.type === 'currency');
	return currencySymbol && currencySymbol.value;
}

/**
 * Converts a price from cents to decimal value
 * @param cents
 * @returns converted dollar value with 2 decimal values
 */
function convertCentsToDollars(cents: number) {
	const dollarValue = Number(((cents / 100) * 100) / 100);
	return dollarValue.toFixed(2);
	// V Beware: this statement interrupts React hydration
	// return number.toLocaleString(locale, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

/**
 * Converts a dollar value to a whole number
 * @param value a dollar value with up to 2 decimal values
 * @returns a whole number conversion
 */
function convertDollarsToWholeNumber(value: number | string) {
	// regex to remove all non-numeric characters, and joins the numbers
	const number = value.toString().match(/\d*/g)?.join('');
	return Number(number);
}

/**
 * Determines the platform fee for every transaction
 * note: HARD CODE THIS VALUE
 * @param amount
 * @returns
 */
function calculatePlatformFeeForTransaction(amount: number) {
	return Math.round(amount * 0.18);
}

function calculateDeliveryFeeForTransaction(amount: number) {
	return Math.round(amount * 0.1);
}

export {
	calculateDeliveryFeeForTransaction,
	orderStatusList,
	checkOrderIsCompleteOrCanceled,
	calcSalePrice,
	getCurrencySymbol,
	convertCentsToDollars,
	convertDollarsToWholeNumber,
	calculatePlatformFeeForTransaction,
};
