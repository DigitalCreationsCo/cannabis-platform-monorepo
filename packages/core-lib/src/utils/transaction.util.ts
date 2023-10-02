import { type OrderStatus, type OrderWithShopDetails } from '@cd/data-access';

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
const checkOrderIsCompleteOrCanceled = (order: OrderWithShopDetails) =>
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

function calculateTransactionFees(
	order: OrderWithShopDetails,
): OrderWithShopDetails {
	const { subtotal, distance } = order;

	const delivery_fee = calculateDeliveryFee(subtotal);
	const mileage_fee = calculateMileageFee(distance);
	const platform_fee = calculatePlatformFee(subtotal);

	// customer pays for delivery fee, mileage fee
	// dispensary pays for platform fee
	// drivers are paid from delivery fees
	const total =
		Number(order.subtotal) + Number(delivery_fee) + Number(mileage_fee);

	return {
		...order,
		deliveryFee: delivery_fee,
		mileageFee: mileage_fee,
		platformFee: platform_fee,
		total,
	};
}

/**
 * calculate the delivery fee
 * @param subtotal
 * @returns number
 */
function calculateDeliveryFee(subtotal: number) {
	return Math.round(subtotal * Number(process.env.NEXT_PUBLIC_DELIVERY_FEE));
}

/**
 * calculate the mileage fee based on trip distance
 * calculate mileage after the first 3 miles, up to 10 miles
 * @param meters
 * @returns number
 */
// distance represents meters, please calculate the distance remaining after 3 miles, up to 10 miles

function calculateMileageFee(meters: number) {
	const miles = convertMetersToMiles(meters);
	const distanceAfter2MilesUpTo10Msiles = Number(
		(miles < 10 ? miles - 2 : 10 - 2).toFixed(2),
	);
	return Math.round(
		distanceAfter2MilesUpTo10Msiles *
			Number(process.env.NEXT_PUBLIC_MILEAGE_RATE) *
			100,
	);
}

const convertMetersToMiles = (meters: number) =>
	Number((meters / 1609.34).toFixed(2));

/**
 * calculate the platform fee for a transaction
 * @param subtotal
 * @returns number
 */
function calculatePlatformFee(subtotal: number) {
	return Math.round(subtotal * Number(process.env.NEXT_PUBLIC_PLATFORM_FEE));
}

export {
	orderStatusList,
	checkOrderIsCompleteOrCanceled,
	calcSalePrice,
	getCurrencySymbol,
	convertCentsToDollars,
	convertDollarsToWholeNumber,
	calculateTransactionFees,
	calculatePlatformFee,
	calculateDeliveryFee,
	calculateMileageFee,
	convertMetersToMiles,
};
