import { OrderWithDetails } from '@cd/data-access';
import {
	calculatePlatformFeeForTransaction,
	checkOrderIsCompleteOrCanceled,
	convertDollarsToWholeNumber
} from '../../src/utils/transaction.util';

describe('checkOrderIsCompleteOrCanceled', () => {
	const delivered_order = {
		orderStatus: 'Delivered',
	} as OrderWithDetails;
	const cancelled_order = {
		orderStatus: 'Cancelled',
	} as OrderWithDetails;
	const pending_order = {
		orderStatus: 'Pending',
	} as OrderWithDetails;
	test(' delivered order returns true', () => {
		expect(checkOrderIsCompleteOrCanceled(delivered_order)).toBe(true);
	});
	test(' cancelled order returns true', () => {
		expect(checkOrderIsCompleteOrCanceled(cancelled_order)).toBe(true);
	});
	test(' pending order returns false', () => {
		expect(checkOrderIsCompleteOrCanceled(pending_order)).toBe(false);
	});
});

describe('convertDollarsToWholeNumber', () => {
	test(' returns the expected value', () => {
		expect(convertDollarsToWholeNumber('$45.00')).toBe(4500);
		expect(convertDollarsToWholeNumber('$145.99')).toBe(14599);
		expect(convertDollarsToWholeNumber('$.25')).toBe(25);
		expect(convertDollarsToWholeNumber('$0.25')).toBe(25);
		expect(convertDollarsToWholeNumber('0.25')).toBe(25);
		expect(convertDollarsToWholeNumber('124.25')).toBe(12425);
		expect(convertDollarsToWholeNumber(124.25)).toBe(12425);
	});
});

describe('calculatePlatformFeeForTransaction', () => {
	test(' returns the expected value', () => {
		expect(calculatePlatformFeeForTransaction(1230)).toBe(221);
		expect(calculatePlatformFeeForTransaction(25399)).toBe(4572);
		expect(calculatePlatformFeeForTransaction(63777)).toBe(11480);
	});
});

describe('calculateDeliveryFeeForTransaction', () => {
	test(' returns the expected value', () => {
		expect(calculatePlatformFeeForTransaction(1230)).toBe(123);
		expect(calculatePlatformFeeForTransaction(25399)).toBe(2539);
		expect(calculatePlatformFeeForTransaction(63777)).toBe(63777);
	});
});
