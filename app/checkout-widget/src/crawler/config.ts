/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import { getDispensaryDomain } from '@cd/core-lib';
import {
	type CrawlerConfig,
	type DOMKey,
	type DOMSelector,
	type WidgetHost,
} from '../types';

/**
 * @class Config
 * Provides the DOM selectors and crawling configuration for the widget
 */

interface CrawlerConfigInterface {
	key: DOMKey;
	config: DOMSelector;
}

class Config implements CrawlerConfigInterface {
	private host: WidgetHost;
	key: DOMKey;
	config: DOMSelector;

	constructor(key: DOMKey) {
		this.host = this.getHost();
		this.key = key;
		this.config = this.crawlerConfig[this.host][key];
	}
	private getHost() {
		try {
			if (typeof window === 'undefined')
				throw new Error('window is not available');
			const host = getDispensaryDomain(window.location.hostname) as WidgetHost;
			console.log('widget host is ', host);
			return host || 'localhost';
		} catch (error) {
			console.error('error getting widget host: ', error);
			console.error('defaulting to localhost');
			return 'localhost';
		}
	}
	private crawlerConfig: CrawlerConfig = {
		localhost: {
			cart: {
				item: {
					'cart-item': '[data-item=cart-item]',
					name: '[data-item=cart-item-name]',
					label: '[data-item=cart-item-brand]',
					basePrice: '[data-item=cart-item-price]',
					quantity: '[data-item=cart-item-quantity]',
					size: '[data-item=cart-item-weight]',
					unit: '[data-item=cart-item-unit]',
					image: '[data-item=cart-item-image]',
				},
				total: '[data-item=cart-total]',
			},
		},
		sunnyside: {
			cart: {
				item: {
					'cart-item': '[data-cy=CartItem]',
					name: '.item__Name',
					label: '.item__Brand',
					basePrice: '.item__Price',
					quantity: '.item__Quantity',
					size: '.item__Name',
					unit: '.item__Name',
					image: '.product-image',
				},
				total: '[data-cy=CartTotal]',
			},
		},
		manasupply: {
			cart: {
				item: {
					'cart-item': '[data-testid=cart-item-container]',
					name: '.item__Name',
					label: '.item__Brand',
					basePrice: '.item__Price',
					quantity: '.item__Quantity',
					size: '.item__Name',
					unit: '.item__Name',
					image: '.product-image',
				},
				total: '[data-testid=cart-dropdown-subtotal]',
			},
		},
	};
}

export { Config };
