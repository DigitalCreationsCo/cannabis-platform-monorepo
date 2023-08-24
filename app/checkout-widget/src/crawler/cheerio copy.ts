/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/no-all-duplicated-branches */
/* eslint-disable sonarjs/no-small-switch */
/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/naming-convention */
import { type SimpleCart } from '@cd/core-lib/src/types/redux.types';
import { convertDollarsToWholeNumber } from '@cd/core-lib/src/utils/transaction.util';
import { type ProductVariantWithDetails } from '@cd/data-access';
import * as cheerio from 'cheerio';
import { type DOMSelector } from '../types';

type DOMDataKey = 'cart';

const cheerioCrawler = async (config: DOMSelector) => {
	try {
		if (typeof window === 'undefined')
			throw new Error('window is not available');
		const _url = window.location.href;
		console.info('crawling url, ', _url);
		const response = await fetch(_url, {
			// headers: {
			// 	'User-Agent':
			// 		'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
			// },
		});
		const html = await response.text();
		const $ = cheerio.load(html);
		const data = parseData('cart');
		return data;

		function parseData(dataKey: DOMDataKey) {
			switch (dataKey) {
				case 'cart':
					return parseCartHtml();
				default:
					return parseCartHtml();
			}
		}

		function parseCartHtml() {
			const _domain = getDispensaryDomain();
			console.info('domain: ', _domain);
			// const cartItemSelector = getCartItemSelector()
			// const _cartItemHtml = $(cartItemSelector).get()

			// const cartTotalSelector = getCartTotalSelector()
			// const _cartTotal = $(cartTotalSelector).text() as unknown as number

			const _cartItemHtml = $(getDomData(_domain)['cart-item']).get();
			console.info('cart items: ', _cartItemHtml);

			const _cartTotal = $(
				getDomData(_domain)['total'],
			).text() as unknown as number;
			console.info('cart total: ', _cartTotal);

			const _cartData = createCartData(_cartItemHtml, _cartTotal);
			return _cartData;

			function getDomData(domain: string) {
				return _domDataSelector[domain] || _domDataSelector['localhost'];
			}
			function getCartItemSelector() {
				return _cartItemSelector[_domain] || _cartItemSelector['localhost'];
			}

			function getCartTotalSelector() {
				return _cartTotalSelector[_domain] || _cartTotalSelector['localhost'];
			}

			// extract this function outside the crawler
			function createCartData(html: any[], total: number): SimpleCart {
				console.info('create cart data input: ', html);
				const cartItems: ProductVariantWithDetails[] = [];

				const cartData: SimpleCart = {
					cartItems: cartItems,
					total: convertDollarsToWholeNumber(total),
				};
				html.forEach((item, index) => {
					const $item = $(item);
					const _item = {
						name: $item.find(getDomData(_domain).name).text(),
						basePrice: convertDollarsToWholeNumber(
							$item.find(getDomData(_domain).basePrice).text(),
						),
						quantity: $item
							.find(getDomData(_domain).quantity)
							.text() as unknown as number,
						size: $item
							.find(getDomData(_domain).size)
							.text() as unknown as number,
						unit: $item.find(getDomData(_domain).unit).text(),
						images: [
							{
								id: index,
								location: (
									$item.find(getDomData(_domain).images.location).attr('src') ||
									''
								).match(/[^(.)].*/g)?.[0] as unknown as string,
							},
						],
					};

					console.info('item created from parseHtml: ', _item);
					cartData.cartItems.push(
						_item as unknown as ProductVariantWithDetails,
					);
				});
				console.info('cartData', cartData);
				return cartData;
			}
		}
	} catch (error) {
		console.info(error);
		const cart: SimpleCart = {
			cartItems: [],
			total: 0,
		};
		return cart;
	}
};

export { cheerioCrawler };
