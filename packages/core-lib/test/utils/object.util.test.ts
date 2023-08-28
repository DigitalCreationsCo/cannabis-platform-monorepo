import { isArray } from '../../src/utils/object.util';

describe('IsArray', () => {
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
