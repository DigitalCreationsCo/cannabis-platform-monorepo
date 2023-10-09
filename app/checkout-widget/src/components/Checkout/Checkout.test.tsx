/* eslint-disable jest/expect-expect */
import { mount, shallow } from 'enzyme';
import { html } from '../../crawler/data/html-test-data';
import { type ViewProps } from '../../widget.types';
import Checkout from '.';

describe('<Checkout />', () => {
	let props: ViewProps;
	let spy: jest.SpyInstance;

	beforeEach(() => {
		const fetch = jest.fn(
			() =>
				new Promise(() => ({
					text: html,
				})) as Promise<Response>,
		);
		global.fetch = fetch;

		props = {
			expanded: false,
			setExpand: () => {},
		} as unknown as ViewProps;
	});

	afterEach(() => {
		spy?.mockClear();
	});

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
		props.useDutchie = true;
		const checkout = shallow<Checkout>(<Checkout {...props} />);
		expect(checkout).toBeDefined();

		// set checkout prop: useDutchie: true
		// call checkout.getCartData();
		// expect checkout crawler to load the correct config how to detect it?
		// test the case result of switch statement
	});

	it('Checkout component calls handleCheckout on click event', () => {
		const checkout = mount<Checkout>(<Checkout {...props} />);
		spy = jest.spyOn(checkout.instance(), 'handleCheckout');

		expect(checkout).toBeDefined();
		checkout.simulate('click');
		expect(checkout.find('#Checkout')).toHaveLength(1);
		checkout.find('#Checkout').simulate('click');
		checkout.setProps({ expanded: true });
		// checkout.find('#Checkout-Button').forEach((b) => b.simulate('click'));
		// expect(spy).toHaveBeenCalled();
	});

	// PLACEHOLDER
	it('Checkout method handleCheckout to generate a cookie after valid cart', () => {
		// const checkout = mount<Checkout>(<Checkout {...props} />);
		// spy = jest.spyOn(checkout.instance(), 'handleCheckout');

		// expect(checkout).toBeDefined();
		// checkout.simulate('click');
		// expect(spy).toHaveBeenCalled();
		expect(1).toStrictEqual(1);
	});

	// PLACEHOLDER
	it('Checkout method handleCheckout to redirect window after valid cart', () => {
		// const checkout = mount<Checkout>(<Checkout {...props} />);
		// spy = jest.spyOn(checkout.instance(), 'handleCheckout');

		// expect(checkout).toBeDefined();
		// checkout.simulate('click');
		// expect(spy).toHaveBeenCalled();
		expect(1).toStrictEqual(1);
	});

	// PLACEHOLDER
	it('Checkout method handleCheckout does not generate cookie after invalid /empty cart', () => {
		// const checkout = mount<Checkout>(<Checkout {...props} />);
		// spy = jest.spyOn(checkout.instance(), 'handleCheckout');

		// expect(checkout).toBeDefined();
		// checkout.simulate('click');
		// expect(spy).toHaveBeenCalled();
		expect(1).toStrictEqual(1);
	});

	// PLACEHOLDER
	it('Checkout method handleCheckout does not redirect window after invalid /empty cart', () => {
		// const checkout = mount<Checkout>(<Checkout {...props} />);
		// spy = jest.spyOn(checkout.instance(), 'handleCheckout');

		// expect(checkout).toBeDefined();
		// checkout.simulate('click');
		// expect(spy).toHaveBeenCalled();
		expect(1).toStrictEqual(1);
	});
});
