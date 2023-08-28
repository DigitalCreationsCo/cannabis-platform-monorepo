/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable @typescript-eslint/naming-convention */
import * as cheerio from 'cheerio';
import { type DOMDataSet } from '../types';
import { Config } from './config';
import { dutchieHtml as html } from './data/html-test-data';
import {
	buildCartItems,
	buildSimpleCartFromDutchieCheckout,
	getCartDOMElements,
	regexFieldDict,
} from './dutchie-crawler';

describe('Crawler : Dutchie', () => {
	it('returns defined data', async () => {
		const config = new Config('dutchie-checkout').config;
		const $ = cheerio.load(html);
		const result = await getCartDOMElements(config, $);
		expect(result).toBeDefined();
	});

	it('returns expected data type', async () => {
		const config = new Config('dutchie-checkout').config;
		const $ = cheerio.load(html);

		const result = await getCartDOMElements(config, $);

		const resultType = {} as DOMDataSet['dutchie-checkout'];
		expect(result).toBeDefined();
		expect(typeof result).toStrictEqual(typeof resultType);
	});

	// it('returns expected results', async () => {
	// 	const config = new Config('dutchie-checkout').config;
	// 	const $ = cheerio.load(html);

	// 	const result = await getCartDOMElements(config, $);
	// 	expect(await getCartDOMElements(config, $)).toMatchObject(result);

	// 	expect(result.items).toBeDefined();
	// 	expect(isArray(result.items)).toBe(true);
	// 	expect(result.items.length).toBeGreaterThan(0);

	// 	expect(result.total).toBeDefined();
	// 	expect(typeof result.total).toBe('string');
	// });

	// it('processCrawlerData returns defined data', async () => {
	// 	const config = new Config('dutchie-checkout').config;
	// 	const data = await processCrawlerData(html, config);
	// 	const simpleCart: SimpleCart = {
	// 		total: 0,
	// 		cartItems: [],
	// 	};
	// 	expect(typeof data).toBeDefined();
	// 	expect(typeof data).toBe('object');
	// 	expect(typeof data).toStrictEqual(typeof simpleCart);

	// 	expect(data.cartItems).toBeDefined();
	// 	expect(isArray(data.cartItems)).toBe(true);
	// 	expect(data.cartItems.length).toBeGreaterThan(0);

	// 	expect(data.total).toBeDefined();
	// 	expect(data.total).not.toBeNaN();
	// 	expect(typeof data.total).toBe('number');
	// });

	it('buildSimpleCartFromDutchieCheckout returns defined data', async () => {
		const result = {
			items: [],
			total: 'string',
		};
		const config = new Config('dutchie-checkout').config;
		expect(buildSimpleCartFromDutchieCheckout(result, config)).toBeDefined();
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
		const config = new Config('dutchie-checkout').config;
		const $ = cheerio.load(html);
		expect(buildCartItems(result['cart-item'], config, $)).toBeDefined();
	});

	// it('buildCartItems returns expected data using cheerio', async () => {
	// 	const $ = cheerio.load(html);
	// 	const config = new Config('dutchie-checkout').config;
	// 	const { items } = await getCartDOMElements(config, $);
	// 	const result = buildCartItems(items, config, $);
	// 	expect(result).toBeDefined();
	// 	expect(isArray(result)).toBe(true);
	// 	expect(result[0].name).toBeTruthy();
	// });

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
		const config = new Config('dutchie-checkout').config;
		global.document = html as unknown as Document;
		expect(buildCartItems(result['cart-item'], config)).toBeDefined();
	});
});

// returns null, need to mock the dom, in a checkout component test
describe('Dutchie-Checkout Regex', () => {
	it('regex returns the correct data from an item string', async () => {
		const string = 'Guava Fig - 3.5g | 1/8oz';

		const name = string.match(regexFieldDict.name)?.[0];
		expect(name).toBe('Guava Fig');
		const size = string.match(regexFieldDict.size)?.[1];
		expect(size).toBe('3.5');
		const unit = string.match(regexFieldDict.unit)?.[1];
		expect(unit).toBe('g');

		const string2 = 'Deep Line Alchemy Pre-rolls - 1g';
		expect(string2.match(regexFieldDict.name)?.[0]).toBe(
			'Deep Line Alchemy Pre-rolls',
		);
		expect(string2.match(regexFieldDict.size)?.[1]).toBe('1');
		expect(string2.match(regexFieldDict.unit)?.[1]).toBe('g');

		const string3 = 'Berry Bliss Airo Pod - 1g';
		expect(string3.match(regexFieldDict.name)?.[0]).toBe(
			'Berry Bliss Airo Pod',
		);
		expect(string3.match(regexFieldDict.size)?.[1]).toBe('1');
		expect(string3.match(regexFieldDict.unit)?.[1]).toBe('g');

		const string4 = 'ElderYum Elderberry Hemp CBD Chews - 500mg';
		expect(string4.match(regexFieldDict.name)?.[0]).toBe(
			'ElderYum Elderberry Hemp CBD Chews',
		);
		expect(string4.match(regexFieldDict.size)?.[1]).toBe('500');
		expect(string4.match(regexFieldDict.unit)?.[1]).toBe('mg');

		const string5 = 'HappyDawg Hemp Pet Tincture';
		expect(string5.match(regexFieldDict.name)?.[0]).toBe(
			'HappyDawg Hemp Pet Tincture',
		);
		expect(string5.match(regexFieldDict.size)?.[1]).toBe(undefined);
		expect(string5.match(regexFieldDict.unit)?.[1]).toBe(undefined);

		const string6 = 'FelineK9 Serenity Hemp Pet Tincture - 840mg';
		expect(string6.match(regexFieldDict.name)?.[0]).toBe(
			'FelineK9 Serenity Hemp Pet Tincture',
		);
		expect(string6.match(regexFieldDict.size)?.[1]).toBe('840');
		expect(string6.match(regexFieldDict.unit)?.[1]).toBe('mg');

		const string7 = 'GR Cherry Burger 50mg RSO Caps ($45 Product)';
		expect(string7.match(regexFieldDict.name)?.[0]).toBe(
			'GR Cherry Burger 50mg RSO Caps',
		);
		expect(string7.match(regexFieldDict.size)?.[1]).toBe('50');
		expect(string7.match(regexFieldDict.unit)?.[1]).toBe('mg');
	});
});
