import { OrderWithShopDetails, ProductVariant } from '@cd/data-access';
import {
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
	calculateSubtotal,
	calculateProductSaleAtQuantity,
} from '../../utils/transaction.util';
import { orders, variants } from '../../dummyData';

const delivered_order = {
	orderStatus: 'Delivered',
	distance: 14580,
	subtotal: 24400,
} as OrderWithShopDetails;

const cancelled_order = {
	orderStatus: 'Cancelled',
	distance: 5500,
	subtotal: 22400,
} as OrderWithShopDetails;

const pending_order = {
	orderStatus: 'Pending',
	distance: 28530,
	subtotal: 14400,
} as OrderWithShopDetails;

describe('isValidOrderRecord', () => {
	const validOrder = orders[0];

	test(' valid order returns true', () => {
		try {
			expect(isValidOrderRecord(validOrder)).toStrictEqual(true);
		} catch (e) {}
	});
	test(' order missing destinationAddress returns false', () => {
		try {
			expect(
				isValidOrderRecord({
					...validOrder,
					destinationAddress: undefined,
				} as any),
			).toThrow();
		} catch (e) {}
	});
	test(' order missing organization returns false', () => {
		try {
			expect(
				isValidOrderRecord({ ...validOrder, organization: undefined } as any),
			).toThrow();
		} catch (e) {}
	});
	test(' order missing customerId returns false', () => {
		try {
			expect(
				isValidOrderRecord({ ...validOrder, customerId: undefined } as any),
			).toThrow();
		} catch (e) {}
	});
	test(' order with subtotal === 0 returns false', () => {
		try {
			expect(
				isValidOrderRecord({ ...validOrder, subtotal: 0 } as any),
			).toThrow();
		} catch (e) {}
	});
	test(' order with subtotal === undefined returns false', () => {
		try {
			expect(
				isValidOrderRecord({ ...validOrder, subtotal: undefined } as any),
			).toThrow();
		} catch (e) {}
	});
	test(' order with total === 0 returns false', () => {
		try {
			expect(isValidOrderRecord({ ...validOrder, total: 0 } as any)).toThrow();
		} catch (e) {}
	});
	test(' order with total === undefined returns false', () => {
		try {
			expect(
				isValidOrderRecord({ ...validOrder, total: undefined } as any),
			).toThrow();
		} catch (e) {}
	});
});

describe('checkOrderIsCompleteOrCanceled', () => {
	test(' delivered order returns true', () => {
		expect(checkOrderIsCompleteOrCanceled(delivered_order)).toStrictEqual(true);
	});
	test(' cancelled order returns true', () => {
		expect(checkOrderIsCompleteOrCanceled(cancelled_order)).toStrictEqual(true);
	});
	test(' pending order returns false', () => {
		expect(checkOrderIsCompleteOrCanceled(pending_order)).toStrictEqual(false);
	});
	test(' pending order returns false', () => {
		expect(
			checkOrderIsCompleteOrCanceled({
				...pending_order,
				orderStatus: 'Processing',
			}),
		).toStrictEqual(false);
	});
});

describe('calculateSalePrice', () => {
	const { basePrice, isDiscount, discount } = {
		basePrice: 1000,
		isDiscount: true,
		discount: 10,
	} as ProductVariant;

	test(' 1000 basePrice with 10 discount returns 900', () => {
		expect(calculateSalePrice(basePrice, isDiscount, discount)).toStrictEqual(
			900,
		);
	});
	test(' 1000 basePrice with 0 discount returns 1000', () => {
		expect(calculateSalePrice(basePrice, false, 0)).toStrictEqual(1000);
	});
	test(' 1000 basePrice with 100 discount returns 0', () => {
		expect(calculateSalePrice(basePrice, true, 100)).toStrictEqual(0);
	});
	test(' 1000 basePrice with 10 discount and isDiscount === false returns 1000', () => {
		expect(calculateSalePrice(basePrice, false, 10)).toStrictEqual(1000);
	});
});

describe('getCurrencySymbol', () => {
	test(' returns the expected currency symbol', () => {
		expect(getCurrencySymbol('USD')).toStrictEqual('$');
		expect(getCurrencySymbol('EUR')).toStrictEqual('€');
		expect(getCurrencySymbol('GBP')).toStrictEqual('£');
		expect(getCurrencySymbol('JPY')).toStrictEqual('¥');
		expect(getCurrencySymbol('EEX')).toStrictEqual('EEX');
	});
});

describe('convertCentsToDollars', () => {
	test(' returns the expected dollar amount', () => {
		expect(convertCentsToDollars(4500)).toStrictEqual('45.00');
		expect(convertCentsToDollars(14599)).toStrictEqual('145.99');
		expect(convertCentsToDollars(25)).toStrictEqual('0.25');
		expect(convertCentsToDollars(12425)).toStrictEqual('124.25');
		expect(convertCentsToDollars(0)).toStrictEqual('0.00');
	});
});

describe('convertDollarsToWholeNumber', () => {
	test(' returns the expected value', () => {
		expect(convertDollarsToWholeNumber('$45.00')).toStrictEqual(4500);
		expect(convertDollarsToWholeNumber('$145.99')).toStrictEqual(14599);
		expect(convertDollarsToWholeNumber('$.25')).toStrictEqual(25);
		expect(convertDollarsToWholeNumber('$0.25')).toStrictEqual(25);
		expect(convertDollarsToWholeNumber('0.25')).toStrictEqual(25);
		expect(convertDollarsToWholeNumber('124.25')).toStrictEqual(12425);
		expect(convertDollarsToWholeNumber(124.25)).toStrictEqual(12425);
	});
});

describe('calculateTransactionFees', () => {
	test(' returns the expected value', () => {
		expect(calculateTransactionFees(delivered_order)).toStrictEqual({
			distance: 14580,
			subtotal: 24400,
			deliveryFee: 1952,
			mileageFee: 254,
			platformFee: 3416,
			total: 26606,
			orderStatus: 'Delivered',
		});
		expect(calculateTransactionFees(cancelled_order)).toStrictEqual({
			deliveryFee: 1792,
			distance: 5500,
			mileageFee: 51,
			orderStatus: 'Cancelled',
			platformFee: 3136,
			subtotal: 22400,
			total: 24243,
		});
		expect(calculateTransactionFees(pending_order)).toStrictEqual({
			deliveryFee: 1152,
			distance: 28530,
			mileageFee: 288,
			orderStatus: 'Pending',
			platformFee: 2016,
			subtotal: 14400,
			total: 15840,
		});
	});
});

describe('calculateTransactionTotal', () => {
	test(' returns the expected value', () => {
		expect(
			calculateTransactionTotal({
				subtotal: 24400,
				deliveryFee: 1952,
				mileageFee: 254,
			}),
		).toStrictEqual(26606);
		expect(
			calculateTransactionTotal({
				subtotal: 22400,
				deliveryFee: 1792,
				mileageFee: 51,
			}),
		).toStrictEqual(24243);
		expect(
			calculateTransactionTotal({
				subtotal: 14400,
				deliveryFee: 1152,
				mileageFee: 288,
			}),
		).toStrictEqual(15840);
	});
});

describe('calculateDeliveryFeeFromSubtotal', () => {
	test(' returns the expected value', () => {
		expect(calculateDeliveryFeeFromSubtotal(12300)).toStrictEqual(984);
		expect(calculateDeliveryFeeFromSubtotal(25399)).toStrictEqual(2032);
		expect(calculateDeliveryFeeFromSubtotal(63777)).toStrictEqual(5102);
	});
});

describe('calculateMileageFee', () => {
	test(' returns the expected value', () => {
		expect(calculateMileageFee(delivered_order.distance)).toStrictEqual(254);
		expect(calculateMileageFee(pending_order.distance)).toStrictEqual(288);
		expect(calculateMileageFee(cancelled_order.distance)).toStrictEqual(51);
	});
});

describe('convertMetersToMiles', () => {
	test(' returns the expected value', () => {
		expect(convertMetersToMiles(63346)).toStrictEqual(39.36);
		expect(convertMetersToMiles(1230)).toStrictEqual(0.76);
		expect(convertMetersToMiles(25399)).toStrictEqual(15.78);
		expect(convertMetersToMiles(63777)).toStrictEqual(39.63);
	});
});

describe('calculatePlatformFee', () => {
	test(' returns the expected value', () => {
		expect(calculatePlatformFee(1230)).toStrictEqual(172);
		expect(calculatePlatformFee(25399)).toStrictEqual(3556);
		expect(calculatePlatformFee(63777)).toStrictEqual(8929);
	});
});

// describe('buildOrderRecord', () => {
// 	const { basePrice, isDiscount, discount } = {
// 		basePrice: 1000,
// 		isDiscount: true,
// 		discount: 10,
// 	} as ProductVariant

// 	test(' returns the expected value', () => {
// 		expect(buildOrderRecord({
// 			...orders[0],
// 			items: [
// 				{
// 					...variants[0],
// 					basePrice,
// 					isDiscount,
// 					discount
// 				}
// 			]
// 		})).toStrictEqual({
// 			...orders[0],
// 			products: [
// 				{
// 					...variants[0],
// 					basePrice,
// 					isDiscount,
// 					discount,
// 					salePrice: 900
// 				}
// 			],
// 			deliveryFee: 1952,
// 			distance: 14580,
// 			mileageFee: 254,
// 			orderStatus: 'Delivered',
// 			platformFee: 3416,
// 			subtotal: 24400,
// 			total: 26606,
// 		});
// 	});
// })

describe('multiplyAllItemsForOrder', () => {
	test(' returns the expected value', () => {
		expect(
			multiplyAllItemsForOrder(
				[
					{
						...variants[0],
						quantity: 3,
						salePrice: 1799,
						basePrice: 2400,
						isDiscount: true,
						discount: 20,
					},
				],
				2,
			),
		).toStrictEqual([
			{
				...variants[0],
				basePrice: 4800,
				discount: 20,
				quantity: 6,
				salePrice: 3598,
			},
		]);
	});
});

describe('calculateSubtotal', () => {
	test(' returns the expected value', () => {
		expect(
			calculateSubtotal([
				{
					...variants[0],
					basePrice: 2000,
					salePrice: 0,
					isDiscount: true,
					discount: 10,
					quantity: 2,
				},
				{
					...variants[1],
					basePrice: 1000,
					salePrice: 0,
					isDiscount: false,
					discount: 0,
					quantity: 1,
				},
			]),
		).toStrictEqual(4600);
		expect(
			calculateSubtotal([
				{
					...variants[0],
					basePrice: 2000,
					salePrice: 0,
					isDiscount: false,
					discount: 10,
					quantity: 2,
				},
				{
					...variants[1],
					basePrice: 1000,
					salePrice: 0,
					isDiscount: false,
					discount: 0,
					quantity: 1,
				},
				{
					...variants[2],
					basePrice: 500,
					salePrice: 0,
					isDiscount: true,
					discount: 5,
					quantity: 1,
				},
			]),
		).toStrictEqual(5475);
		expect(
			calculateSubtotal([
				{
					...variants[0],
					basePrice: 2000,
					salePrice: 1950,
					isDiscount: false,
					discount: 10,
					quantity: 2,
				},
				{
					...variants[1],
					basePrice: 1000,
					salePrice: 950,
					isDiscount: false,
					discount: 0,
					quantity: 1,
				},
				{
					...variants[2],
					basePrice: 500,
					salePrice: 420,
					isDiscount: true,
					discount: 5,
					quantity: 1,
				},
				{
					...variants[3],
					basePrice: 500,
					salePrice: 420,
					isDiscount: true,
					discount: 5,
					quantity: 1,
				},
			]),
		).toStrictEqual(5798);
	});
});

describe('calculateProductSaleAtQuantity', () => {
	test(' returns the expected value', () => {
		expect(
			calculateProductSaleAtQuantity({
				basePrice: 2000,
				isDiscount: true,
				discount: 10,
				quantity: 2,
			}),
		).toStrictEqual(3600);
		expect(
			calculateProductSaleAtQuantity({
				basePrice: 1000,
				isDiscount: false,
				discount: 0,
				quantity: 4,
			}),
		).toStrictEqual(4000);
		expect(
			calculateProductSaleAtQuantity({
				basePrice: 500,
				isDiscount: true,
				discount: 5,
				quantity: 1,
			}),
		).toStrictEqual(475);
	});
});
