/* eslint-disable jest/expect-expect */
import { mount, shallow } from 'enzyme';
import { html } from '../crawler/data/html-test-data';
import { type ViewProps } from '../types';
import Checkout from './Checkout';

describe('<Checkout />', () => {
	beforeEach(() => {
		const fetch = jest.fn(
			() =>
				new Promise(() => ({
					text: html,
				})) as Promise<Response>,
		);
		global.fetch = fetch;
	});

	let spy: jest.SpyInstance;
	afterEach(() => {
		spy?.mockClear();
	});

	const props: ViewProps = {} as any;
	it('renders without crashing', () => {
		const wrapper = shallow(<Checkout {...props} />);
		expect(wrapper).toBeDefined();
	});

	it('Checkout component is defined', () => {
		const checkout = shallow<Checkout>(<Checkout {...props} />);
		expect(checkout).toBeDefined();
	});

	it('Checkout component calls getCartData on mount', () => {
		const checkout = mount<Checkout>(<Checkout {...props} />);
		spy = jest.spyOn(checkout.instance(), 'getCartData');

		expect(checkout).toBeDefined();
		checkout.instance().getCartData();
		expect(spy).toHaveBeenCalled();
	});

	it('Checkout component loads the cart crawler config', () => {
		const checkout = shallow<Checkout>(<Checkout {...props} />);
		expect(checkout).toBeDefined();

		// set checkout prop: useDutchie: false 10min
		// call checkout.getCartData(); 20min
		// expect checkout crawler to load the correct config how to detect it?
		// test the case result of switch statement
	});

	it('Checkout component loads the dutchie-checkout crawler config', () => {
		const checkout = shallow<Checkout>(<Checkout {...props} />);
		expect(checkout).toBeDefined();

		// set checkout prop: useDutchie: true
		// call checkout.getCartData();
		// expect checkout crawler to load the correct config how to detect it?
		// test the case result of switch statement
	});
});
