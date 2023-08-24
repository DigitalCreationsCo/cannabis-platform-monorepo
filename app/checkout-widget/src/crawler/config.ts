/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */
import { type CrawlerConfig, type WidgetHost } from '../types';

class Config {
	private host: WidgetHost;
	constructor(host: WidgetHost) {
		this.host = host;
		return this.config[host] as any;
	}
	public config: CrawlerConfig = {
		localhost: {
			cart: {
				'cart-item': '[data-item=cart-item]',
				total: '[data-item=cart-total]',
				name: '[data-item=cart-item-name]',
				label: '[data-item=cart-item-brand]',
				basePrice: '[data-item=cart-item-price]',
				quantity: '[data-item=cart-item-quantity]',
				size: '[data-item=cart-item-weight]',
				unit: '[data-item=cart-item-unit]',
				image: '[data-item=cart-item-image]',
			},
		},
		sunnyside: {
			cart: {
				'cart-item': '[data-cy=CartItem]',
				total: '[data-cy=CartTotal]',
				name: '.item__Name',
				label: '.item__Brand',
				basePrice: '.item__Price',
				quantity: '.item__Quantity',
				size: '.item__Name',
				unit: '.item__Name',
				image: '.product-image',
			},
		},
		manasupplyco: {
			cart: {
				'cart-item': '[data-testid=cart-item-container]',
				total: '[data-testid=cart-dropdown-subtotal]',
				name: '.item__Name',
				label: '.item__Brand',
				basePrice: '.item__Price',
				quantity: '.item__Quantity',
				size: '.item__Name',
				unit: '.item__Name',
				image: '.product-image',
			},
		},
	};
}

export { Config };
