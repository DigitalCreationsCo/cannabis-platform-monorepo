import { Address } from '@cd/data-access';
import {
	buildSTFormFields,
	renderAddress,
	renderNestedDataObject
} from '../../utils/ui';

const address: Address = {
	id: '1',
	street1: '123 Main St',
	street2: 'Apt 1',
	city: 'Denver',
	state: 'CO',
	country: 'USA',
	countryCode: 'US',
	coordinateId: '1',
	zipcode: 80202,
	createdAt: new Date(),
	updatedAt: new Date(),
};

describe('renderAddress', () => {
	test(' displays a correct address', () => {
		expect(renderAddress({ address })).toEqual(
			`123 Main St Apt 1 \nDenver, CO 80202`,
		);
	});

	test(' displays a correct address - no show zipcode', () => {
		expect(renderAddress({ address, showZipcode: false })).toEqual(
			`123 Main St Apt 1 \nDenver, CO`,
		);
	});

	test(' displays a correct address - no show country', () => {
		expect(renderAddress({ address, showCountry: false })).toEqual(
			'123 Main St Apt 1 \nDenver, CO 80202',
		);
	});

	test(' displays a correct address - no show state', () => {
		expect(renderAddress({ address, showState: false })).toEqual(
			`123 Main St Apt 1 Denver`,
		);
	});

	test(' displays a correct address - no show city', () => {
		expect(renderAddress({ address, showCity: false })).toEqual(
			'123 Main St Apt 1',
		);
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
		expect(renderNestedDataObject(data, Component, {removeFields})).toEqual(
			result,
		);
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
		expect(renderNestedDataObject(data, Component)).toEqual(result);
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
		expect(renderNestedDataObject(data, Component)).toEqual(result);
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
			expect(buildSTFormFields(data)).toEqual(result);
		});
	});
});
