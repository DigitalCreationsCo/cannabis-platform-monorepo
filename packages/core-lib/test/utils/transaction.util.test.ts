import { OrderWithShopDetails } from '@cd/data-access';
import {
	calculateDeliveryFee,
	calculateMileageFee,
	calculatePlatformFee,
	calculateTransactionFees,
	checkOrderIsCompleteOrCanceled,
	convertDollarsToWholeNumber,
	convertMetersToMiles,
} from '../../src/utils/transaction.util';

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

describe('calculateDeliveryFee', () => {
	test(' returns the expected value', () => {
		expect(calculateDeliveryFee(12300)).toStrictEqual(984);
		expect(calculateDeliveryFee(25399)).toStrictEqual(2032);
		expect(calculateDeliveryFee(63777)).toStrictEqual(5102);
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
