import { Address, Country } from '@cd/data-access';
type Schedule = any;
import {
	buildSTFormFields,
	getDigitToWord,
	renderAddress,
	renderNestedDataObject,
	renderSchedule,
} from '../..';

const address: Address = {
	id: '1',
	street1: '123 Main St',
	street2: 'Apt 1',
	city: 'Denver',
	state: 'CO',
	country: 'United States',
	countryCode: 'US',
	coordinateId: '1',
	zipcode: '80202',
};

describe('renderAddress', () => {
	test(' displays a correct address', () => {
		expect(renderAddress({ address })).toStrictEqual(
			`123 Main St Apt 1 \nDenver, CO 80202`,
		);
	});

	test(' displays a correct address - no show zipcode', () => {
		expect(renderAddress({ address, showZipcode: false })).toStrictEqual(
			`123 Main St Apt 1 \nDenver, CO`,
		);
	});

	test(' displays a correct address - no show country', () => {
		expect(renderAddress({ address, showCountry: false })).toStrictEqual(
			'123 Main St Apt 1 \nDenver, CO 80202',
		);
	});

	test(' displays a correct address - no show state', () => {
		expect(renderAddress({ address, showState: false })).toStrictEqual(
			`123 Main St Apt 1 Denver`,
		);
	});

	test(' displays a correct address - no show city', () => {
		expect(renderAddress({ address, showCity: false })).toStrictEqual(
			'123 Main St Apt 1',
		);
	});
});

describe('renderSchedule', () => {
	const schedule = [
		{ day: 'Monday', openAt: 800, closeAt: 2000 },
		{ day: 'Tuesday', openAt: 800, closeAt: 2000 },
		{ day: 'Wednesday', openAt: 800, closeAt: 2000 },
		{ day: 'Thursday', openAt: 800, closeAt: 2000 },
		{ day: 'Friday', openAt: 800, closeAt: 2000 },
		{ day: 'Saturday', openAt: 800, closeAt: 1600 },
		{ day: 'Sunday', openAt: 800, closeAt: 1600 },
	] as Schedule[];
	test(' displays a correct address', () => {
		expect(renderSchedule(schedule)).toStrictEqual([
			['Monday', '8am to 8pm'],
			['Tuesday', '8am to 8pm'],
			['Wednesday', '8am to 8pm'],
			['Thursday', '8am to 8pm'],
			['Friday', '8am to 8pm'],
			['Saturday', '8am to 4pm'],
			['Sunday', '8am to 4pm'],
		]);
	});
});

describe('renderNestedDataObject ', () => {
	test(' displays a correct nested object with remove fields', () => {
		const data = {
			name: 'John Doe',
			age: 25,
			address: {
				street1: '123 Main St',
				street2: 'Apt 1',
				city: 'Denver',
				state: 'CO',
				country: 'USA',
				zipcode: '80202',
			},
		};
		const Component = (props: any) => props.children;
		const removeFields = ['age'];
		const result = [
			'name: John Doe',
			'street1: 123 Main St',
			'street2: Apt 1',
			'city: Denver',
			'state: CO',
			'country: USA',
			'zipcode: 80202',
		];
		expect(
			renderNestedDataObject(data, Component, { removeFields }),
		).toStrictEqual(result);
	});

	test(' displays a correct nested object without remove fields', () => {
		const data = {
			name: 'John Doe',
			age: 25,
			address: {
				street1: '123 Main St',
				street2: 'Apt 1',
				city: 'Denver',
				state: 'CO',
				country: 'USA',
				zipcode: '80202',
			},
		};
		const Component = (props: any) => props.children;
		const result = [
			'name: John Doe',
			'age: 25',
			'street1: 123 Main St',
			'street2: Apt 1',
			'city: Denver',
			'state: CO',
			'country: USA',
			'zipcode: 80202',
		];
		expect(renderNestedDataObject(data, Component)).toStrictEqual(result);
	});

	test(' displays a correct nested object with nested fields', () => {
		const data = {
			name: 'John Doe',
			age: 25,
			address: {
				street1: '123 Main St',
				street2: 'Apt 1',
				city: 'Denver',
				state: 'CO',
				country: 'USA',
				zipcode: '80202',
			},
			likes: [
				{ chasing: 'butterflies' },
				{ eating: 'apples' },
				{ doing: 'exercise' },
			],
		};
		const Component = (props: any) => props.children;
		const result = [
			'name: John Doe',
			'age: 25',
			'street1: 123 Main St',
			'street2: Apt 1',
			'city: Denver',
			'state: CO',
			'country: USA',
			'zipcode: 80202',
			'chasing: butterflies',
			'eating: apples',
			'doing: exercise',
		];
		expect(renderNestedDataObject(data, Component)).toStrictEqual(result);
	});

	describe('buildSTFormFields', () => {
		test(' displays correct data fields for supertokens input', () => {
			const data = {
				name: 'John Doe',
				age: 25,
				address: {
					street1: '123 Main St',
					street2: 'Apt 1',
					city: 'Denver',
					state: 'CO',
					country: 'USA',
					zipcode: '80202',
				},
			};
			const result = [
				{ id: 'name', value: 'John Doe' },
				{ id: 'age', value: 25 },
				{
					id: 'address',
					value: [
						{ id: 'street1', value: '123 Main St' },
						{ id: 'street2', value: 'Apt 1' },
						{ id: 'city', value: 'Denver' },
						{ id: 'state', value: 'CO' },
						{ id: 'country', value: 'USA' },
						{ id: 'zipcode', value: '80202' },
					],
				},
			];
			expect(buildSTFormFields(data)).toStrictEqual(result);
		});
	});
});

describe('getDigitToWord', () => {
	it('gets correct word from a digit', () => {
		expect(getDigitToWord('1')).toStrictEqual('one');
		expect(getDigitToWord('2')).toStrictEqual('two');
		expect(getDigitToWord('9')).toStrictEqual('nine');
		expect(getDigitToWord(1)).toStrictEqual('one');
		expect(getDigitToWord(2)).toStrictEqual('two');
		expect(getDigitToWord(9)).toStrictEqual('nine');
	});
});
