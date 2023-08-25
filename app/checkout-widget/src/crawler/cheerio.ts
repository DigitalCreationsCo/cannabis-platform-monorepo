import { type SimpleCart } from '@cd/core-lib/src/types/redux.types';
import { convertDollarsToWholeNumber } from '@cd/core-lib/src/utils/transaction.util';
import { type ProductVariantWithDetails } from '@cd/data-access';
import * as cheerio from 'cheerio';
import { type DOMDataSet, type DOMKey, type DOMQueryResult } from '../types';

// in the future, crawler accepts only a key, and the config is generated
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
		const data = processCrawlerData(html, config, 'cart');
		if (!data) throw new Error('no data found');
		console.log('crawler data: ', data);
		return data;
	} catch (error: any) {
		console.error('error in cheerio crawler: ', error);
		throw new Error(error.message);
	}
}

// in the future, take all these functions and build a Crawler Class
async function processCrawlerData<K extends DOMKey>(
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
	return (await result()) as ProcessReturnType<K>;
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
	$: cheerio.Root | any,
): ProductVariantWithDetails[] {
	if (typeof $ === 'undefined') {
		$ = (selector: any) => document.querySelector(selector);
	}
	const cartItems: ProductVariantWithDetails[] = [];
	items.forEach((item, index) => {
		const _$ = (label: string) => $(item).find(label);
		cartItems.push({
			name: _$(item.name).text(),
			basePrice: convertDollarsToWholeNumber(_$(item.basePrice).text()),
			quantity: Number(_$(item.quantity).text()),
			size: Number(_$(item.size).text()),
			unit: _$(item.unit).text(),
			images: [
				{
					id: `Simple-Cart-Item-${index}`,
					location: _$(item.image).attr('src') || '',
					// .match(/[^(.)].*/g)?.[0] as unknown as string,
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
			total: Number(total),
		};
	} catch (error) {
		console.info('error parsing cart data, ', error);
		return {
			cartItems: [],
			total: 0,
		};
	}
}
