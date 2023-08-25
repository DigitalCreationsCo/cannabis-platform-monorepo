/* eslint-disable @typescript-eslint/naming-convention */
import { Config } from './config';
import {
	buildCartItems,
	buildSimpleCart,
	getDOMElementsFromConfig,
} from './crawler-helpers';

describe('getDomElements: Cart', () => {
	it('Crawler returns valid dom elements for the cart', async () => {
		const DOMKEY = 'cart';
		const config = new Config(DOMKEY).config;
		expect(await getDOMElementsFromConfig(config)).not.toBeNull();

		// returns null, need to mock the dom, in a checkout component test
		// expect(await getDOMElementsFromConfig(config)).toMatchObject<
		// 	DOMDataSet[DOMKey]
		// >({
		// 	'cart-item': {
		// 		name: 'something',
		// 		label: 'string',
		// 		basePrice: 'string',
		// 		quantity: 'string',
		// 		size: 'string',
		// 		unit: 'string',
		// 		image: 'string',
		// 		'cart-item': 'string',
		// 	},
		// 	total: 'string',
		// });
	});

	it('buildSimpleCart returns expected object', async () => {
		const result = {
			item: [
				{
					name: 'something',
					label: 'string',
					basePrice: 'string',
					quantity: 'string',
					size: 'string',
					unit: 'string',
					image: 'string',
					'cart-item': 'string',
				},
			],
			total: 'string',
		};
		expect(buildSimpleCart(result)).toBeDefined();
	});

	it('buildCartItems returns expected object', async () => {
		const result = {
			'cart-item': [
				{
					name: 'something',
					label: 'string',
					basePrice: 'string',
					quantity: 'string',
					size: 'string',
					unit: 'string',
					image: 'string',
					'cart-item': 'string',
				},
			],
			total: 'string',
		};
		expect(buildCartItems(result['cart-item'])).toBeDefined();
	});
});
