/* eslint-disable regexp/no-super-linear-backtracking */
import { getSelectedOptionValue } from '@cd/core-lib';
import { type SimpleCart } from '@cd/core-lib/src/types/redux.types';
import { convertDollarsToWholeNumber } from '@cd/core-lib/src/utils/transaction.util';
import { type ProductVariantWithDetails } from '@cd/data-access';
import * as cheerio from 'cheerio';
import {
	type DOMDataSet,
	type DOMKey,
	type DOMQueryResult,
	type DOMSelector,
} from '../types';

// in the future, crawler accepts only a key, and the config is generated
// make the exported functions public class methods, for testing
export default async function dutchieCrawler(config: DOMSelector) {
	try {
		if (typeof window === 'undefined')
			throw new Error('window is not available');
		const html = await fetchPageData();
		const data = await processCrawlerData(html, config);
		if (!data) throw new Error('no data found');
		return data;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.message);
	}
}

async function fetchPageData(): Promise<string> {
	try {
		if (!document) throw new Error('Could not get page data');
		return document.documentElement.innerHTML;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.message);
	}
}

type ProcessReturnType<K> = K extends 'cart' ? SimpleCart : never;
export async function processCrawlerData<K extends DOMKey>(
	html: string,
	config: DOMSelector,
) {
	const $ = cheerio.load(html);
	const result = await getCartDOMElements(config, $).then((result) =>
		buildSimpleCartFromDutchieCheckout(result, config, $),
	);
	return result as unknown as ProcessReturnType<K>;
}

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
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		src = (el: HTMLElement) => el?.getAttribute('src') || '';
	}
	const cartItems: ProductVariantWithDetails[] = [];
	items.forEach((item, index) => {
		console.info('crawled item: ', item);
		const _cartItem = {
			name: text(_$(item, config.item.name)).match(regexFieldDict.name)?.[1],
			basePrice: convertDollarsToWholeNumber(
				text(_$(item, config.item.basePrice)),
			),
			quantity: Number(getSelectedOptionValue(config.item.quantity, index)),
			size: Number(
				text(_$(item, config.item.name)).match(regexFieldDict.size)?.[1],
			),
			unit: text(_$(item, config.item.unit)).match(regexFieldDict.unit)?.[1],
			// no images in dutchie cart
			images: [
				{
					id: `Item-Image-${index}`,
					location: '',
				},
			],
		} as ProductVariantWithDetails;
		cartItems.push(_cartItem);
	});
	return cartItems;
}

export function buildSimpleCartFromDutchieCheckout(
	input: DOMQueryResult['cart'],
	config: DOMDataSet['cart'],
	$?: cheerio.Root | any,
): SimpleCart {
	try {
		if (!input) throw new Error('no input data');
		const items = input.items;
		const total = input.total;
		return {
			cartItems: buildCartItems(items, config, $).map((item) => ({
				...item,
				basePrice: item.basePrice / item.quantity,
			})),
			subtotal: convertDollarsToWholeNumber(
				extractValueFromStringInfo(total, 'subtotal')[0].value,
			),
			tax: convertDollarsToWholeNumber(
				extractValueFromStringInfo(total, 'taxes')[0].value,
			),
			total: convertSubTotalAndTaxNumber(total),
		};
	} catch (error) {
		console.error(
			'buildSimpleCartFromDutchieCheckout: error build cart data, ',
			error,
		);
		return {
			cartItems: [],
			tax: 0,
			total: 0,
		};
	}
}

export function convertSubTotalAndTaxNumber(value: number | string) {
	console.info('convertSubTotalAndTaxNumber: ', value);
	const total = value
		.toString()
		.match(/\d*/g)
		?.filter((val) => val !== '')
		// filter numbers, concat dollar and cent pairs, and add the values
		.reduce((acc, val, index, array) => {
			console.log('array: ', array);
			if (index % 2 === 0) {
				console.log('index: ', index);
				console.info('value: ', Number(array[index].concat(array[index + 1])));
				acc += Number(array[index].concat(array[index + 1]));
			}
			console.info('acc: ', acc);
			return acc;
		}, 0) as number;
	console.info('total: ', total);
	return convertDollarsToWholeNumber(total);
}

export function extractValueFromStringInfo(
	inputString: string,
	label: 'subtotal' | 'taxes',
) {
	// set string to all lowercase
	inputString = inputString.toLowerCase();
	// Define a regular expression to match the label and the dollar values
	const regex = new RegExp(`${label}: \\$([\\d.]+)`, 'g');

	// Initialize variables to store the results
	const matches = [];
	let match;

	// Use the regular expression to find all tax matches in the input string
	while ((match = regex.exec(inputString)) !== null) {
		matches.push({
			label: label,
			value: match[1],
		});
	}
	console.info('matches: ', matches);
	return matches;
}

export const regexFieldDict = {
	name: /^(.*?)(?= -*\W\S|$)/,
	size: /\b(\d+(\.\d+)?)(?=\w*\b)/,
	unit: /\b\d+(?:\.\d+)?\s*(\w+)\b/,
	// unit: /^(?:.*\| (.+)|([^|]+))$/,
};
