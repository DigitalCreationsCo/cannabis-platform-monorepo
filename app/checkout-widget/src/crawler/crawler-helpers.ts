import { type SimpleCart } from '@cd/core-lib';
import * as cheerio from 'cheerio';
import { type DOMSelector } from '../types';

export function getDOMElements(config: any, $: cheerio.Root | any = {}) {
	// if (typeof $ === 'undefined')
	// $.prototype.get = function (selector: any)

	// return document.querySelector(selector);
	// {
	// 	else return $(selector).get();
	// };
	// if $ is undefined,
	// set $ to be a function that returns the result of document.querySelector
	// else set $ to be a function that returns the result of $(selector).get()
	// $ =
	// 	typeof $ === 'undefined'
	// 		? (selector: any) => document.querySelector(selector)
	// 		: (selector: any) => $(selector).get();
	if ($ !== typeof cheerio.root) {
		$ = (selector: any) => document.querySelector(selector);
	}
	const data = Object.keys(config).reduce(
		(map: Record<any, string>, label: any) => {
			map[label] = $(config[label]);
			return map;
		},
		{} as Record<keyof DOMSelector, string>,
	);
	console.info('getDOMElements: ', data);
	return data;
}

export function parseCartData(input: any[]): SimpleCart {
	try {
		const cart = input;
		console.info('cartData', cart);
		return cart as any;
	} catch (error) {
		console.info('error parsing cart data, ', error);
		const cart: SimpleCart = {
			cartItems: [],
			total: 0,
		};
		return cart;
	}
}
