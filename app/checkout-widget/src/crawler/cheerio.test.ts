/* eslint-disable @typescript-eslint/naming-convention */
import { buildCartItems, buildSimpleCart } from './crawler-helpers';

// 		// returns null, need to mock the dom, in a checkout component test
describe('getDomElements: Cart', () => {
	// 	it('Crawler returns valid dom elements for the cart', async () => {
	// 		const DOMKEY = 'cart';
	// 		const config = new Config(DOMKEY).config;
	// 		expect(await getDOMElementsFromConfig(config)).not.toBeNull();

	// 		// expect(await getDOMElementsFromConfig(config)).toMatchObject<
	// 		// 	DOMDataSet[DOMKey]
	// 		// >({
	// 		// 	'cart-item': {
	// 		// 		name: 'something',
	// 		// 		label: 'string',
	// 		// 		basePrice: 'string',
	// 		// 		quantity: 'string',
	// 		// 		size: 'string',
	// 		// 		unit: 'string',
	// 		// 		image: 'string',
	// 		// 		'cart-item': 'string',
	// 		// 	},
	// 		// 	total: 'string',
	// 		// });
	// 	});

	it('buildSimpleCart returns expected object', async () => {
		const result = {
			items: [],
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
