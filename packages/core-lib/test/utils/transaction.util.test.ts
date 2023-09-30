import { OrderWithShopDetails } from '@cd/data-access';
import {
	calculateDeliveryFee,
	calculateMileageFee,
	calculatePlatformFee, calculateTransactionFees, checkOrderIsCompleteOrCanceled,
	convertDollarsToWholeNumber,
	convertMetersToMiles
} from '../../src/utils/transaction.util';

const delivered_order = {
	orderStatus: 'Delivered',
	distance: 14580,
	subtotal:24400,
} as OrderWithShopDetails;

const cancelled_order = {
	orderStatus: 'Cancelled',
	distance: 5500,
	subtotal:22400,
} as OrderWithShopDetails;

const pending_order = {
	orderStatus: 'Pending',
	distance:28530,
	subtotal:14400
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
			delivery_fee: 0,
			mileage_fee: 0,
			platform_fee: 0,
			total: 0
		});
		expect(calculateTransactionFees(delivered_order)).toStrictEqual({
			delivery_fee: 0,
			mileage_fee: 0,
			platform_fee: 0,
			total: 0
		});
		expect(calculateTransactionFees(delivered_order)).toStrictEqual({
			delivery_fee: 0,
			mileage_fee: 0,
			platform_fee: 0,
			total: 0
		});
	});
});

describe('calculateDeliveryFee', () => {
	test(' returns the expected value', () => {
		expect(calculateDeliveryFee(12300)).toStrictEqual(861);
		expect(calculateDeliveryFee(25399)).toStrictEqual(1778);
		expect(calculateDeliveryFee(63777)).toStrictEqual(4464);
	});
});

describe('calculateMileageFee', () => {
	test(' returns the expected value', () => {
		expect(calculateMileageFee(delivered_order.distance)).toStrictEqual(221);
		expect(calculateMileageFee(pending_order.distance)).toStrictEqual(4572);
		expect(calculateMileageFee(cancelled_order.distance)).toStrictEqual(11480);
	});
});

describe('convertMetersToMiles', () => {
	test(' returns the expected value', () => {
		expect(convertMetersToMiles(1230)).toStrictEqual(221);
		expect(convertMetersToMiles(25399)).toStrictEqual(4572);
		expect(convertMetersToMiles(63777)).toStrictEqual(11480);
	});
});

describe('calculatePlatformFee', () => {
	test(' returns the expected value', () => {
		expect(calculatePlatformFee(1230)).toStrictEqual(221);
		expect(calculatePlatformFee(25399)).toStrictEqual(4572);
		expect(calculatePlatformFee(63777)).toStrictEqual(11480);
	});
});