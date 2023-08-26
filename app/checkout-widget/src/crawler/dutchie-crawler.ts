import { type SimpleCart } from '@cd/core-lib/src/types/redux.types';
import { convertDollarsToWholeNumber } from '@cd/core-lib/src/utils/transaction.util';
import { type ProductVariantWithDetails } from '@cd/data-access';
import * as cheerio from 'cheerio';
import { type DOMDataSet, type DOMKey, type DOMQueryResult } from '../types';

// in the future, crawler accepts only a key, and the config is generated
// make the exported functions public class methods, for testing
export default async function dutchieCrawler(
	config: DOMDataSet[typeof key],
	key: DOMKey,
) {
	try {
		if (typeof window === 'undefined')
			throw new Error('window is not available');
		const _url = window.location.href;
		const response = await fetch(_url);
		const html = await response.text();
		console.log('html from dutchie ', html);
		const data = await processCrawlerData(html, config, 'cart');
		if (!data) throw new Error('no data found');
		return data;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.message);
	}
}

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

export function buildCartItems(
	items: DOMQueryResult['cart']['items'],
	config: DOMDataSet['cart'],
	$?: cheerio.Root,
): ProductVariantWithDetails[] {
	let _$: any;
	let text: (arg: any) => string;
	let src: (arg: any) => string;
	if (typeof $ !== 'undefined') {
		_$ = (item: any, label: keyof DOMDataSet['cart']['item']) =>
			$(item).find(label);
		text = (el: cheerio.Cheerio) => el?.text().replace(/\n|\t/g, '') || '';
		src = (el: cheerio.Cheerio) => el?.attr('src')?.replace(/\n|\t/g, '') || '';
	}
	if (typeof $ === 'undefined') {
		_$ = (item: DOMQueryResult['cart']['items'][0], label: string) =>
			document.querySelector(`${item['cart-item']} ${label}`);
		text = (el: HTMLElement) => el?.textContent || '';
		src = (el: HTMLElement) => el?.getAttribute('src') || '';
	}
	const cartItems: ProductVariantWithDetails[] = [];
	items.forEach((item, index) => {
		const _cartItem = {
			// split the name from the textcontent
			name: text(_$(item, config.item.name)).match(regexFieldDict.name)?.[1],

			// get child div from base price
			basePrice: convertDollarsToWholeNumber(
				text(_$(item, config.item.basePrice)),
			),
			// get the select option value
			quantity: Number(text(_$(item, config.item.quantity))),

			// split the size from name textcontent
			size: Number(
				text(_$(item, config.item.name)).match(regexFieldDict.size)?.[1],
			),

			// split the unit from name textcontent
			unit: text(_$(item, config.item.unit)).match(regexFieldDict.unit)?.[2],

			// no images in dutchie cart
			images: [
				{
					id: `Item-Image-${index}`,
					location: src(_$(item, config.item.image)),
				},
			],
		} as ProductVariantWithDetails;
		cartItems.push(_cartItem);
	});
	return cartItems;
}

export const regexFieldDict = {
	name: /^(.*?)(?= -|$)/,
	// eslint-disable-next-line regexp/optimal-quantifier-concatenation
	size: /-\s+(\d*\.?\d*)(\w*)/,
	unit: /-\s*\d+(?:\.\d+)?\s*(\w+)/,
};

export function buildSimpleCart(
	input: DOMQueryResult['cart'],
	config: DOMDataSet['cart'],
	$?: cheerio.Root | any,
): SimpleCart {
	try {
		if (!input) throw new Error('no input data');
		const items = input.items;
		const total = input.total;
		return {
			cartItems: buildCartItems(items, config, $),
			total: convertDollarsToWholeNumber(total),
		};
	} catch (error) {
		console.error('buildSimpleCart: error build cart data, ', error);
		return {
			cartItems: [],
			total: 0,
		};
	}
}
