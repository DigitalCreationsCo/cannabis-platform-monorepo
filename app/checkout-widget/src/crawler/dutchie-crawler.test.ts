/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable @typescript-eslint/naming-convention */
import * as cheerio from 'cheerio';
import { type DOMDataSet } from '../widget.types';
import { Config } from './crawler.config';
import { dutchieHtml as html } from './data/html-test-data';
// create a test page from dutchie, eventually

import {
	buildCartItems,
	convertSubTotalAndTaxNumber,
	extractValueFromStringInfo,
	getCartDOMElements,
	regexFieldDict,
} from './dutchie-crawler';

describe('Crawler : Dutchie', () => {
	it('returns defined data', async () => {
		const config = new Config('dutchie').config;
		const $ = cheerio.load(html);
		const result = await getCartDOMElements(config, $);
		expect(result).toBeDefined();
	});

	it('returns expected data type', async () => {
		const config = new Config('dutchie').config;
		const $ = cheerio.load(html);

		const result = await getCartDOMElements(config, $);

		const resultType = {} as DOMDataSet['dutchie'];
		expect(result).toBeDefined();
		expect(typeof result).toStrictEqual(typeof resultType);
	});

	// it('returns expected results', async () => {
	// 	const config = new Config('dutchie').config;
	// 	const $ = cheerio.load(html);

	// 	const result = await getCartDOMElements(config, $);
	// 	expect(await getCartDOMElements(config, $)).toMatchObject(result);

	// 	expect(result.items).toBeDefined();
	// 	expect(isArray(result.items)).toStrictEqual(true);
	// 	expect(result.items.length).toBeGreaterThan(0);

	// 	expect(result.total).toBeDefined();
	// 	expect(typeof result.total).toStrictEqual('string');
	// });

	// it('processCrawlerData returns defined data', async () => {
	// 	const config = new Config('dutchie').config;
	// 	const data = await processCrawlerData(html, config);
	// 	const simpleCart: SimpleCart = {
	// 		total: 0,
	// 		cartItems: [],
	// 	};
	// 	expect(typeof data).toBeDefined();
	// 	expect(typeof data).toStrictEqual('object');
	// 	expect(typeof data).toStrictEqual(typeof simpleCart);

	// 	expect(data.cartItems).toBeDefined();
	// 	expect(isArray(data.cartItems)).toStrictEqual(true);
	// 	expect(data.cartItems.length).toBeGreaterThan(0);

	// 	expect(data.total).toBeDefined();
	// 	expect(data.total).not.toBeNaN();
	// 	expect(typeof data.total).toStrictEqual('number');
	// });

	// it('buildSimpleCartFromDutchieCheckout returns defined data', async () => {
	// 	const result = {
	// 		items: [],
	// 		total: 'string',
	// 	};
	// 	const config = new Config('dutchie').config;
	// 	expect(buildSimpleCartFromDutchieCheckout(result, config)).toBeDefined();
	// });

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
		const config = new Config('dutchie').config;
		const $ = cheerio.load(html);
		expect(buildCartItems(result['cart-item'], config, $)).toBeDefined();
	});

	// it('buildCartItems returns expected data using cheerio', async () => {
	// 	const $ = cheerio.load(html);
	// 	const config = new Config('dutchie').config;
	// 	const { items } = await getCartDOMElements(config, $);
	// 	const result = buildCartItems(items, config, $);
	// 	expect(result).toBeDefined();
	// 	expect(isArray(result)).toStrictEqual(true);
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
		const config = new Config('dutchie').config;
		global.document = html as unknown as Document;
		expect(buildCartItems(result['cart-item'], config)).toBeDefined();
	});
});

// returns null, need to mock the dom, in a checkout component test
describe('dutchie Regex', () => {
	it('regex returns the correct data from an item string', async () => {
		const string = 'Guava Fig - 3.5g | 1/8oz';

		const name = string.match(regexFieldDict.name)?.[0];
		expect(name).toStrictEqual('Guava Fig');
		const size = string.match(regexFieldDict.size)?.[1];
		expect(size).toStrictEqual('3.5');
		const unit = string.match(regexFieldDict.unit)?.[1];
		expect(unit).toStrictEqual('g');

		const string2 = 'Deep Line Alchemy Pre-rolls - 1g';
		expect(string2.match(regexFieldDict.name)?.[0]).toStrictEqual(
			'Deep Line Alchemy Pre-rolls',
		);
		expect(string2.match(regexFieldDict.size)?.[1]).toStrictEqual('1');
		expect(string2.match(regexFieldDict.unit)?.[1]).toStrictEqual('g');

		const string3 = 'Berry Bliss Airo Pod - 1g';
		expect(string3.match(regexFieldDict.name)?.[0]).toStrictEqual(
			'Berry Bliss Airo Pod',
		);
		expect(string3.match(regexFieldDict.size)?.[1]).toStrictEqual('1');
		expect(string3.match(regexFieldDict.unit)?.[1]).toStrictEqual('g');

		const string4 = 'ElderYum Elderberry Hemp CBD Chews - 500mg';
		expect(string4.match(regexFieldDict.name)?.[0]).toStrictEqual(
			'ElderYum Elderberry Hemp CBD Chews',
		);
		expect(string4.match(regexFieldDict.size)?.[1]).toStrictEqual('500');
		expect(string4.match(regexFieldDict.unit)?.[1]).toStrictEqual('mg');

		const string5 = 'HappyDawg Hemp Pet Tincture';
		expect(string5.match(regexFieldDict.name)?.[0]).toStrictEqual(
			'HappyDawg Hemp Pet Tincture',
		);
		expect(string5.match(regexFieldDict.size)?.[1]).toStrictEqual(undefined);
		expect(string5.match(regexFieldDict.unit)?.[1]).toStrictEqual(undefined);

		const string6 = 'FelineK9 Serenity Hemp Pet Tincture - 840mg';
		expect(string6.match(regexFieldDict.name)?.[0]).toStrictEqual(
			'FelineK9 Serenity Hemp Pet Tincture',
		);
		expect(string6.match(regexFieldDict.size)?.[1]).toStrictEqual('840');
		expect(string6.match(regexFieldDict.unit)?.[1]).toStrictEqual('mg');

		const string7 = 'GR Cherry Burger 50mg RSO Caps ($45 Product)';
		expect(string7.match(regexFieldDict.name)?.[0]).toStrictEqual(
			'GR Cherry Burger 50mg RSO Caps',
		);
		expect(string7.match(regexFieldDict.size)?.[1]).toStrictEqual('50');
		expect(string7.match(regexFieldDict.unit)?.[1]).toStrictEqual('mg');
	});
});

describe('convertSubTotalAndTaxNumber', () => {
	it('format and add subtotal and tax values from one string', () => {
		const string = 'subtotal $25.00tax $2.00';
		const result = convertSubTotalAndTaxNumber(string);
		expect(result).toBe(2700);

		const string2 = 'subtotal $24.00 tax $2.00';
		const result2 = convertSubTotalAndTaxNumber(string2);
		expect(result2).toBe(2600);

		const string3 = 'subtotal $24.00 tax $2.00fee $26.00';
		const result3 = convertSubTotalAndTaxNumber(string3);
		expect(result3).toBe(5200);
	});
});

describe('extractValueFromStringInfo', () => {
	it('returns the correct data from an item string as whole number', () => {
		const string = 'Subtotal: $405.00Taxes: $36.45';
		expect(extractValueFromStringInfo(string, 'taxes')).toBe(3645);
		expect(extractValueFromStringInfo(string, 'subtotal')).toBe(40500);

		const string2 = 'Subtotal: $405.00 Taxes: $36.45';
		expect(extractValueFromStringInfo(string2, 'taxes')).toBe(3645);
		expect(extractValueFromStringInfo(string2, 'subtotal')).toBe(40500);

		const string3 = 'Subtotal: $405.00Discount: $68.00 Taxes: $36.45';
		expect(extractValueFromStringInfo(string3, 'taxes')).toBe(3645);
		expect(extractValueFromStringInfo(string3, 'subtotal')).toBe(40500);
		expect(extractValueFromStringInfo(string3, 'discount')).toBe(6800);
	});
});
