/* eslint-disable @typescript-eslint/no-non-null-assertion */
type ProductVariantWithDetails = any;
type OrderCreateType = any;
type OrderStatus = any;
type OrderWithShopDetails = any;
type Coordinates = any;
type OrderCreateMinimalFields = any;
type ProductVariant = any;
import { getTravelDistanceFromCoordinates } from './geo.util';

/** 
 * orderStatusList,
	isValidOrderRecord,
	checkOrderIsCompleteOrCanceled,
	calculateSalePrice,
	getCurrencySymbol,
	convertCentsToDollars,
	convertDollarsToWholeNumber,
	calculateTransactionFees,
	calculateTransactionTotal,
	calculateDeliveryFeeFromSubtotal,
	convertMetersToMiles,
	calculateMileageFee,
	calculatePlatformFee,
	buildOrderRecord,
	multiplyAllItemsForOrder,
	getDailyDealProductsAndCalculateTotal,
	calculateSubtotal,
	calculateProductSaleAtQuantity,
*/

const orderStatusList: OrderStatus[] = [
	'Pending',
	'Processing',
	'Delivered',
	'Cancelled',
];

const isValidOrderRecord = (order: OrderCreateMinimalFields) => {
	if (
		order?.destinationAddress !== undefined &&
		order?.organization !== undefined &&
		order?.customerId &&
		order?.subtotal > 0 &&
		order?.total > 0
	)
		return true;
	else throw new Error('Invalid order');
};

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
function calculateSalePrice(
	price: number,
	isDiscount: boolean,
	discount: number
) {
	const _discountPercentage = discount / 100;
	const _price = price;
	return isDiscount
		? _price === discount * price
			? _price
			: _price - price * _discountPercentage
		: price;
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
	order: OrderWithShopDetails
): OrderWithShopDetails {
	// DailyDeals include taxes and fees in the price.
	if (order.isWeedTextOrder) {
		return order;
	} else {
		const { subtotal, distance } = order;

		const deliveryFee = calculateDeliveryFeeFromSubtotal(subtotal);
		const mileageFee = calculateMileageFee(distance);
		const platformFee = calculatePlatformFee(subtotal);

		// customer pays for delivery fee, mileage fee
		// dispensary pays for platform fee
		// drivers are paid from delivery fees
		const total = calculateTransactionTotal({
			subtotal,
			deliveryFee,
			mileageFee,
		});

		return {
			...order,
			deliveryFee,
			mileageFee,
			platformFee,
			total,
		};
	}
}

function calculateTransactionTotal({
	subtotal = 0,
	deliveryFee = 0,
	mileageFee = 0,
}) {
	return Number(subtotal) + Number(deliveryFee) + Number(mileageFee);
}

/**
 * calculate the delivery fee
 * @param subtotal
 * @returns number
 */
function calculateDeliveryFeeFromSubtotal(subtotal: number) {
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
		(miles < 10 ? miles - 2 : 10 - 2).toFixed(2)
	);
	return Math.round(
		distanceAfter2MilesUpTo10Msiles *
			Number(process.env.NEXT_PUBLIC_MILEAGE_RATE) *
			100
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
	return Math.round(subtotal * Number(process.env.NEXT_PUBLIC_PLATFORM_FEE!));
}

async function buildOrderRecord({
	type = 'delivery',
	organization,
	customer,
	subtotal,
	taxFactor,
	taxAmount,
	isWeedTextOrder = false,
	distance,
	mileageFee,
	platformFee,
	deliveryFee,
	destinationAddress,
	orderStatus = 'Pending',
	items,
	total,
}: OrderCreateMinimalFields) {
	try {
		if (!distance) {
			distance = await getTravelDistanceFromCoordinates(
				organization.address.coordinates as Coordinates,
				customer.address[0].coordinates as Coordinates
			);
		}

		destinationAddress = destinationAddress ?? customer.address[0];

		mileageFee = mileageFee ?? calculateMileageFee(distance);
		platformFee = platformFee ?? calculatePlatformFee(subtotal);
		deliveryFee = deliveryFee ?? calculateDeliveryFeeFromSubtotal(subtotal);

		total =
			total ?? calculateTransactionTotal({ subtotal, deliveryFee, mileageFee });
		// should platformFee be included in this??

		const order: OrderCreateMinimalFields = {
			type,
			orderStatus,
			organizationId: organization.id,
			organization,
			customer,
			customerId: customer.id,
			addressId: customer.address[0].id,
			destinationAddress,
			taxFactor,
			taxAmount,
			distance,
			subtotal,
			mileageFee,
			platformFee,
			deliveryFee,
			total,
			isWeedTextOrder,
			items,
		};

		if (!isValidOrderRecord(order)) {
			throw new Error('Invalid order record');
		}
		return order as OrderCreateType;
	} catch (error) {
		console.error('buildOrderRecord: ', error);
		throw new Error(error.message);
	}
}

function multiplyAllItemsForOrder(items: ProductVariant[], numOrders: number) {
	return items.map((item) => {
		const { quantity, basePrice, salePrice, ...rest } = item;
		return {
			...rest,
			quantity: quantity * numOrders,
			basePrice: basePrice * numOrders,
			salePrice: salePrice * numOrders,
		};
	});
}

// async function getDailyDealProductsAndCalculateTotal(
// 	deal: DailyDealCreateWithSkus,
// ) {
// 	if (
// 		!deal.products.length ||
// 		deal.products.length === 0 ||
// 		!deal.products[0].sku
// 	) {
// 		throw new Error('No products were provided');
// 	}

// 	if (!deal.organization) {
// 		throw new Error('No organization was provided');
// 	}

// 	const { products: skus } = deal;
// 	const posIntegration = await (
// 		await import('../point-of-sale/IntegrationService')
// 	).IntegrationService.getPOSIntegrationService(deal.organization.pos);

// 	// fetch products from integrated point of sale
// 	const products = (await Promise.all(
// 		skus.map(async ({ sku }) => {
// 			return await posIntegration.getProduct(sku);
// 		}),
// 	)) as ProductVariantWithDetails[];

// 	const subtotal = calculateSubtotal(products);
// 	const deliveryFee = calculateDeliveryFeeFromSubtotal(subtotal);

// 	const dealWithProducts: DailyDealWithProductDetails = {
// 		...deal,
// 		products,
// 		total: calculateTransactionTotal({
// 			subtotal,
// 			deliveryFee,
// 			mileageFee: 0, // mileage fee is calculated after the order is placed. The dispensary pays for this fee for daily deals.
// 		}),
// 		isExpired: false,
// 	};

// 	return dealWithProducts;
// }

function calculateSubtotal(products: ProductVariantWithDetails[]) {
	return products.reduce((sum, item) => {
		const { basePrice, salePrice, discount, isDiscount, quantity } = item;
		return (
			sum +
			calculateProductSaleAtQuantity({
				basePrice,
				salePrice,
				isDiscount,
				discount,
				quantity,
			})
		);
	}, 0);
}

// discount is a flat number representing percentage off
function calculateProductSaleAtQuantity({
	basePrice,
	discount = 0,
	isDiscount = false,
	salePrice = 0,
	quantity,
}: {
	basePrice: number;
	discount?: number;
	isDiscount?: boolean;
	salePrice?: number;
	quantity: number;
}) {
	let price = basePrice * quantity;
	if (salePrice && salePrice > 0 && isDiscount) {
		price = salePrice * quantity;
	}
	return isDiscount ? price - Math.round(price * (discount / 100)) : price;
}

export {
	orderStatusList,
	isValidOrderRecord,
	checkOrderIsCompleteOrCanceled,
	calculateSalePrice,
	getCurrencySymbol,
	convertCentsToDollars,
	convertDollarsToWholeNumber,
	calculateTransactionFees,
	calculateTransactionTotal,
	calculateDeliveryFeeFromSubtotal,
	convertMetersToMiles,
	calculateMileageFee,
	calculatePlatformFee,
	buildOrderRecord,
	multiplyAllItemsForOrder,
	// getDailyDealProductsAndCalculateTotal,
	calculateSubtotal,
	calculateProductSaleAtQuantity,
};
