/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable @typescript-eslint/naming-convention */
import * as cheerio from 'cheerio';
import { buildCartItems, buildSimpleCart } from './cheerio';
import { Config } from './config';
import { html } from './data/html-test-data';

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

	// refactor to use Crawler Class
	it('buildSimpleCart returns expected object', async () => {
		const result = {
			items: [],
			total: 'string',
		};
		const config = new Config('cart').config;
		const $ = (selector: any) => document.querySelector(selector);
		expect(buildSimpleCart(result, config, $)).toBeDefined();
	});

	// refactor to use Crawler Class
	it('buildCartItems returns expected object using cheerio', async () => {
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
		const config = new Config('cart').config;
		const $ = cheerio.load(html);
		expect(buildCartItems(result['cart-item'], config, $)).toBeDefined();
	});

	it('buildCartItems returns expected object using document selector', async () => {
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
		const config = new Config('cart').config;
		global.document = html as unknown as Document;
		expect(buildCartItems(result['cart-item'], config)).toBeDefined();
	});
});
