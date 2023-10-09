/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import { getDispensaryDomain } from '@cd/core-lib';
import {
	type CrawlerConfig,
	type DOMKey,
	type DOMSelector,
	type WidgetHost,
} from '../widget.types';

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
		this.key = key;
		this.host = this.getHost();
		this.config = this.getConfig();
	}
	private getHost(): WidgetHost {
		try {
			if (typeof window === 'undefined')
				throw new Error('window is not available');
			let host: WidgetHost;
			if (this.key === 'dutchie-checkout') {
				host = 'dutchie';
			} else {
				host = getDispensaryDomain(window.location.hostname) as WidgetHost;
			}
			return host || 'localhost';
		} catch (error) {
			console.error('error getting widget host: ', error);
			console.error('defaulting to localhost');
			return 'localhost';
		}
	}
	private getConfig(): DOMSelector {
		const config = this.crawlerConfig[this.host][this.key];
		if (!config) {
			throw new Error('no config found');
		}
		return config;
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
					'cart-item': '.summary-item__Container-sc-1gislal-0 dRTSHc',
					name: '.product-details__ProductName-sc-10w5qcl-1 liueda',
					label: '.product-details__BrandName-sc-10w5qcl-2 iOmPMN',
					basePrice: '.summary-item__Price-sc-1gislal-2 kfcOnR',
					quantity: '.select__StyledSelect-sc-6nehhv-1 bdTYYe',
					size: '.product-details__ProductName-sc-10w5qcl-1 liueda',
					unit: '.product-details__ProductName-sc-10w5qcl-1 liueda',
					image: '',
				},
				total: '.sc-AxjAm iFcYSf cost-table__CostItem-ggum6p-2 hCunA',
			},
		},
		dutchie: {
			'dutchie-checkout': {
				item: {
					'cart-item': '.summary-item__Container-sc-1gislal-0',
					name: '.product-details__ProductName-sc-10w5qcl-1',
					label: '.product-details__BrandName-sc-10w5qcl-2',
					basePrice: '.summary-item__Price-sc-1gislal-2',
					quantity: '.select__StyledSelect-sc-6nehhv-1',
					size: '.product-details__ProductName-sc-10w5qcl-1',
					unit: '.product-details__ProductName-sc-10w5qcl-1',
					image: '',
				},
				total: '.cost-table__CostItem-ggum6p-2',
			},
		},
	};
}

export { Config };
