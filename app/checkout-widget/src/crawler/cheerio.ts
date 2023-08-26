import { type SimpleCart } from '@cd/core-lib/src/types/redux.types';
import { convertDollarsToWholeNumber } from '@cd/core-lib/src/utils/transaction.util';
import { type ProductVariantWithDetails } from '@cd/data-access';
import * as cheerio from 'cheerio';
import { type DOMDataSet, type DOMKey, type DOMQueryResult } from '../types';

// in the future, crawler accepts only a key, and the config is generated
// make the exported functions public class methods, for testing
export default async function cheerioCrawler(
	config: DOMDataSet[typeof key],
	key: DOMKey,
) {
	try {
		if (typeof window === 'undefined')
			throw new Error('window is not available');
		const _url = window.location.href;
		console.info('crawling url, ', _url);
		const response = await fetch(_url);
		const html = await response.text();
		const data = await processCrawlerData(html, config, 'cart');
		if (!data) throw new Error('no data found');
		console.log('crawler data: ', data);
		return data;
	} catch (error: any) {
		console.error('error in cheerio crawler: ', error);
		throw new Error(error.message);
	}
}

// in the future, take all these functions and build a Crawler Class
export async function processCrawlerData<K extends DOMKey>(
	html: string,
	config: DOMDataSet[typeof key],
	key: K,
) {
	const $ = cheerio.load(html);
	// eslint-disable-next-line sonarjs/no-small-switch
	// eslint-disable-next-line sonarjs/no-small-switch
	const result = async () => {
		// eslint-disable-next-line sonarjs/no-small-switch
		switch (key) {
			case 'cart':
				return await getCartDOMElements(config, $).then((result) =>
					buildSimpleCart(result, config, $),
				);
			default:
				return await getCartDOMElements(config, $);
		}
	};
	return result() as unknown as ProcessReturnType<K>;
}
type ProcessReturnType<K> = K extends 'cart' ? SimpleCart : never;

export async function getCartDOMElements(
	config: DOMDataSet['cart'],
	$: cheerio.Root,
) {
	return {
		items: $(config.item['cart-item']).get(),
		total: $(config.total).text(),
	};
}

export async function getDOMElementsFromConfig<T extends Record<any, any>>(
	config: T,
	$: cheerio.Root,
): Promise<any> {
	// if (typeof $ !== typeof cheerio.root) {
	// 	console.log('setting $ to document');
	// 	$ = (selector: any) => document.querySelector(selector);
	// }
	console.log('keys: ', Object.keys(config));
	return Object.keys(config).reduce(
		async (map: Record<any, any>, label: any) => {
			if (typeof config[label] === 'string')
				map[label] = await $(config[label]).text();
			if (typeof config[label] === 'object')
				map[label] = await getDOMElementsFromConfig(config[label], $);
			console.log('crawer label: ', label, ' value: ', config[label]);
			console.log('map: ', map);
			return { ...map, [label]: map[label] };
		},
		{} as Promise<Record<any, any>>,
	);
}

export function getDOMElementsFromSelector(
	selector: string,
	$: cheerio.Root | any = {},
): cheerio.Cheerio | any {
	// if ($ !== typeof cheerio.root) {
	// 	$ = (selector: any) => document.querySelector(selector);
	// }
	return $(selector);
}

export function buildCartItems(
	items: DOMQueryResult['cart']['items'],
	config: DOMDataSet['cart'],
	$?: cheerio.Root,
): ProductVariantWithDetails[] {
	let _$: any;
	let text: (arg: any) => string;
	let src: (arg: any) => string;
	if (typeof $ !== 'undefined' && typeof $ === typeof cheerio.root) {
		_$ = (item: DOMQueryResult['cart']['items'][0], label: string) =>
			$(item).find(label);
		text = (el: cheerio.Cheerio) => el?.text() || '';
		src = (el: cheerio.Cheerio) => el?.attr('src') || '';
	}
	if (typeof $ === 'undefined' || typeof $ === typeof document.querySelector) {
		_$ = (item: DOMQueryResult['cart']['items'][0], label: string) =>
			document.querySelector(`${item['cart-item']} ${label}`);
		text = (el: HTMLElement) => el?.textContent || '';
		src = (el: HTMLElement) => el?.getAttribute('src') || '';
	}
	const cartItems: ProductVariantWithDetails[] = [];
	items.forEach((item, index) => {
		cartItems.push({
			name: text(_$(item, item.name)),
			basePrice: convertDollarsToWholeNumber(text(_$(item, item.basePrice))),
			quantity: Number(text(_$(item, item.quantity))),
			size: Number(text(_$(item, item.size))),
			unit: text(_$(item, item.unit)),
			images: [
				{
					id: `Simple-Cart-Item-${index}`,
					location: src(_$(item, item.image)),
				},
			],
		} as ProductVariantWithDetails);
	});
	return cartItems;
}

export function buildSimpleCart(
	input: DOMQueryResult['cart'],
	config: DOMDataSet['cart'],
	$?: cheerio.Root | any,
): SimpleCart {
	try {
		if (typeof $ === 'undefined') {
			$ = (selector: any) => document.querySelector(selector);
		}
		if (!input) throw new Error('no input data');
		const items = input.items;
		const total = input.total;
		return {
			cartItems: buildCartItems(items, config, $),
			total: convertDollarsToWholeNumber(total),
		};
	} catch (error) {
		console.info('buildSimpleCart: error build cart data, ', error);
		return {
			cartItems: [],
			total: 0,
		};
	}
}
