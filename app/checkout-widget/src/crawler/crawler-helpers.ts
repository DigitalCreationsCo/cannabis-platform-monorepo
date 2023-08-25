import { type SimpleCart } from '@cd/core-lib';
import { type DOMDataSet } from '../types';

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

export function buildSimpleCart(input: {
	items: any[];
	total: string;
}): SimpleCart {
	try {
		if (!input) throw new Error('no input data');
		const items = input.items;
		const total = input.total;
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
