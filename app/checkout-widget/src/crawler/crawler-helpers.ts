import { type SimpleCart } from '@cd/core-lib';
import * as cheerio from 'cheerio';
import { type DOMQueryResult } from '../types';

export async function getDOMElementsFromConfig<T extends Record<any, any>>(
	config: T,
	$: cheerio.Root | any = {},
): Promise<any> {
	if ($ !== typeof cheerio.root) {
		$ = (selector: any) => document.querySelector(selector);
	}
	return Object.keys(config).reduce(
		async (map: Record<any, any>, label: any) => {
			if (typeof config[label] === 'string') map[label] = $(config[label]);
			if (typeof config[label] === 'object')
				map[label] = await getDOMElementsFromConfig(config[label], $);
			console.log('crawer label: ', label, ' value: ', config[label]);
			console.log('map: ', map);
			return map;
		},
		{} as Promise<Record<any, any>>,
	);
}

export async function getDOMElementsFromSelector(
	selector: string,
	$: cheerio.Root | any = {},
): Promise<any | any[]> {
	if ($ !== typeof cheerio.root) {
		$ = (selector: any) => document.querySelector(selector);
	}
	return $(selector);
}

export function buildCartItems(items: any[]) {
	// do something here
	return items.map((item) => item);

	// html.forEach((item, index) => {
	// 	const $item = $(item);
	// 	const _item = {
	// 		name: $item.find(getDomData(_domain).name).text(),
	// 		basePrice: convertDollarsToWholeNumber(
	// 			$item.find(getDomData(_domain).basePrice).text(),
	// 		),
	// 		quantity: $item
	// 			.find(getDomData(_domain).quantity)
	// 			.text() as unknown as number,
	// 		size: $item
	// 			.find(getDomData(_domain).size)
	// 			.text() as unknown as number,
	// 		unit: $item.find(getDomData(_domain).unit).text(),
	// 		images: [
	// 			{
	// 				id: index,
	// 				location: (
	// 					$item.find(getDomData(_domain).images.location).attr('src') ||
	// 					''
	// 				).match(/[^(.)].*/g)?.[0] as unknown as string,
	// 			},
	// 		],
	// 	};

	// 	console.info('item created from parseHtml: ', _item);
	// 	cartData.cartItems.push(
	// 		_item as unknown as ProductVariantWithDetails,
	// 	);
	// });
}

export function buildSimpleCart(input: DOMQueryResult['cart']): SimpleCart {
	try {
		if (!input) throw new Error('no input data');
		const items = input['cart-item'];
		const total = input.total;
		// build cart items from dom data
		// extract the total from dom data
		return {
			cartItems: buildCartItems(items),
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
