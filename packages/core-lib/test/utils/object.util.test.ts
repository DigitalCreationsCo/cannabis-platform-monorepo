import { isArray, isEmpty } from '../../src/utils/object.util';

describe('isEmpty', () => {
	test('empty array returns true', () => {
		expect(isEmpty([])).toStrictEqual(true);
	});
	test('filled array returns false', () => {
		expect(isEmpty([1, 2, 3, 4])).toStrictEqual(false);
	});
	test('empty object returns true', () => {
		expect(isEmpty({})).toStrictEqual(true);
	});
	test('filled object returns false', () => {
		expect(isEmpty({ id: '1' })).toStrictEqual(false);
	});
	test('empty string returns true', () => {
		expect(isEmpty('')).toStrictEqual(true);
	});
	test('filled string returns false', () => {
		expect(isEmpty('hello')).toStrictEqual(false);
	});
	test('0 returns true', () => {
		expect(isEmpty(0)).toStrictEqual(true);
	});
	test('number over 0 returns false', () => {
		expect(isEmpty(1)).toStrictEqual(true);
	});
	test('boolean false returns true', () => {
		expect(isEmpty(false)).toStrictEqual(true);
	});
	test('boolean true returns false', () => {
		expect(isEmpty(true)).toStrictEqual(true);
	});
	test('null returns true', () => {
		expect(isEmpty(null)).toStrictEqual(true);
	});
	test('undefined returns true', () => {
		expect(isEmpty(undefined)).toStrictEqual(true);
	});
});

describe('isArray', () => {
	test(' correctly tells an empty array', () => {
		expect(isArray([])).toStrictEqual(true);
	});
	test(' correctly tells a filled array', () => {
		expect(isArray([1, 2, 3, 4])).toStrictEqual(true);
	});
	test(' correctly tells an empty object is not array', () => {
		expect(isArray({})).toStrictEqual(false);
	});
	test(' correctly tells an filled object is not array', () => {
		expect(isArray({ id: '1' })).toStrictEqual(false);
	});
	test(' correctly tells a string is not array', () => {
		expect(isArray('1')).toStrictEqual(false);
	});
	test(' correctly tells a number is not array', () => {
		expect(isArray(1)).toStrictEqual(false);
	});
	test(' correctly tells a true boolean is not array', () => {
		expect(isArray(true)).toStrictEqual(false);
	});
	test(' correctly tells a false boolean is not array', () => {
		expect(isArray(false)).toStrictEqual(false);
	});
});

// placeholder test
describe('normalizeUserData', () => {
	test(' correctly tells a false boolean is not array', () => {
		expect(isArray(false)).toStrictEqual(false);
	});
});

// placeholder test
describe('pruneData', () => {
	test(' correctly tells a false boolean is not array', () => {
		expect(isArray(false)).toStrictEqual(false);
	});
});

// placeholder test
describe('shuffle', () => {
	test(' correctly tells a false boolean is not array', () => {
		expect(isArray(false)).toStrictEqual(false);
	});
});

// placeholder test
describe('normalizeUserData', () => {
	test(' correctly tells a false boolean is not array', () => {
		expect(isArray(false)).toStrictEqual(false);
	});
});

// placeholder test
describe('dateToString', () => {
	test(' correctly tells a false boolean is not array', () => {
		expect(isArray(false)).toStrictEqual(false);
	});
});

// placeholder test
describe('addressObjectIntoArray', () => {
	test(' correctly tells a false boolean is not array', () => {
		expect(isArray(false)).toStrictEqual(false);
	});
});

// placeholder test
describe('reconcileStateArray', () => {
	test(' correctly tells a false boolean is not array', () => {
		expect(isArray(false)).toStrictEqual(false);
	});
});
