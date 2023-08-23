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

type DOMDataKey = 'cart';

const cheerioCrawler = async (crawlerConfig: any) => {
	const _cartItemSelector = {
		localhost: '[data-item=cart-item]',
		sunnyside: '[data-cy=CartItem]',
		manasupply: '[data-testid=cart-item-container]',
	};
	const _cartTotalSelector = {
		localhost: '[data-item=cart-total]',
		sunnyside: '[data-cy=CartTotal]',
		manasupply: '[data-testid=cart-dropdown-subtotal]',
	};

	type DomData = {
		'cart-item': string;
		total: string;
		name: string;
		label: string;
		basePrice: string;
		quantity: string;
		size: string;
		unit: string;
		images: {
			location: string;
		};
	};
	const _domDataSelector: Record<string, DomData> = {
		localhost: {
			'cart-item': '[data-item=cart-item]',
			total: '[data-item=cart-total]',
			name: '[data-item=cart-item-name]',
			label: '[data-item=cart-item-brand]',
			basePrice: '[data-item=cart-item-price]',
			quantity: '[data-item=cart-item-quantity]',
			size: '[data-item=cart-item-weight]',
			unit: '[data-item=cart-item-unit]',
			images: {
				location: '[data-item=cart-item-image]',
			},
		},
		sunnyside: {
			'cart-item': '[data-cy=CartItem]',
			total: '[data-cy=CartTotal]',
			name: '.item__Name',
			label: '.item__Brand',
			basePrice: '.item__Price',
			quantity: '.item__Quantity',
			size: '.item__Name',
			unit: '.item__Name',
			images: {
				location: '.product-image',
			},
		},
		manasupply: {
			'cart-item': '[data-testid=cart-item-container]',
			total: '[data-testid=cart-dropdown-subtotal]',
			name: '.item__Name',
			label: '.item__Brand',
			basePrice: '.item__Price',
			quantity: '.item__Quantity',
			size: '.item__Name',
			unit: '.item__Name',
			images: {
				location: '.product-image',
			},
		},
	};

	try {
		if (typeof window === 'undefined')
			throw new Error('window is not available');

		const _url = window.location.href;
		console.info('get url: ', _url);

		const response = await fetch(_url, {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
			},
		});
		console.info('response: ', response);

		const html = await response.text();
		console.info('html found: ', html);

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

			function createCartData(
				html: cheerio.AnyNode[],
				total: number,
			): SimpleCart {
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

function getDispensaryDomain() {
	switch (true) {
		case window.location.href.includes('sunnyside'):
			return 'sunnyside';
		case window.location.href.includes('manasupply'):
			return 'manasupply';
		default:
			return 'localhost';
	}
}

export { cheerioCrawler };
