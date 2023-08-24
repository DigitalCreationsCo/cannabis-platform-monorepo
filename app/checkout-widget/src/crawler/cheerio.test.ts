import { Config } from './config';
import { getDOMElements } from './crawler-helpers';

describe('getDomElements', () => {
	it('returns valid dom elements', () => {
		const config = new Config('cart').config;
		expect(getDOMElements(config)).not.toBeNull();
	});
});
