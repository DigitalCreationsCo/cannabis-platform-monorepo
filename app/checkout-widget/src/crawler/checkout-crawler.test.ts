/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable @typescript-eslint/naming-convention */
import { type SimpleCart } from '@cd/core-lib/src/types/redux.types';
import { isArray } from '@cd/core-lib/src/utils/object.util';
import * as cheerio from 'cheerio';
import { type DOMQueryResult } from '../types';
import {
	buildCartItems,
	buildSimpleCart,
	getCartDOMElements,
	processCrawlerData,
} from './checkout-crawler';
import { Config } from './crawler.config';
import { html } from './data/html-test-data';

// 		// returns null, need to mock the dom, in a checkout component test
describe('Crawler : Cart', () => {
	it('returns defined data', async () => {
		const config = new Config('cart').config;
		const $ = cheerio.load(html);
		const result = await getCartDOMElements(config, $);
		expect(result).toBeDefined();
	});

	it('returns expected data type', async () => {
		const config = new Config('cart').config;
		const $ = cheerio.load(html);

		const result = await getCartDOMElements(config, $);

		const resultType = {} as DOMQueryResult['cart'];
		expect(result).toBeDefined();
		expect(typeof result).toStrictEqual(typeof resultType);
	});

	it('returns expected results', async () => {
		const config = new Config('cart').config;
		const $ = cheerio.load(html);

		const result = await getCartDOMElements(config, $);
		expect(await getCartDOMElements(config, $)).toMatchObject(result);

		expect(result.items).toBeDefined();
		expect(isArray(result.items)).toBe(true);
		expect(result.items.length).toBeGreaterThan(0);

		expect(result.total).toBeDefined();
		expect(typeof result.total).toBe('string');
	});

	it('processCrawlerData returns defined data', async () => {
		const config = new Config('cart').config;
		const data = await processCrawlerData(html, config, 'cart');
		const simpleCart: SimpleCart = {
			total: 0,
			cartItems: [],
		};
		expect(typeof data).toBeDefined();
		expect(typeof data).toBe('object');
		expect(typeof data).toStrictEqual(typeof simpleCart);

		expect(data.cartItems).toBeDefined();
		expect(isArray(data.cartItems)).toBe(true);
		expect(data.cartItems.length).toBeGreaterThan(0);

		expect(data.total).toBeDefined();
		expect(data.total).not.toBeNaN();
		expect(typeof data.total).toBe('number');
	});

	it('buildSimpleCart returns defined data', async () => {
		const result = {
			items: [],
			total: 'string',
		};
		const config = new Config('cart').config;
		expect(buildSimpleCart(result, config)).toBeDefined();
	});

	it('buildCartItems returns using cheerio', async () => {
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

	it('buildCartItems returns expected data using cheerio', async () => {
		const $ = cheerio.load(html);
		const config = new Config('cart').config;
		const { items } = await getCartDOMElements(config, $);
		const result = buildCartItems(items, config, $);
		expect(result).toBeDefined();
		expect(isArray(result)).toBe(true);
		expect(result[0].name).toBeTruthy();
	});

	it('buildCartItems returns using document selector', async () => {
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
