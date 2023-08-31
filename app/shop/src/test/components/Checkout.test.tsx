/* eslint-disable jest/no-commented-out-tests */

import { shallow } from 'enzyme';
import Checkout from '../../pages/checkout/index';
describe('<Checkout />', () => {
	beforeEach(() => {
		// mock redux store with a valid order, and valid user
		// test renderAddress is called, with matching address
		// test user delivery info is valid
		// test for non match conditions also
		// test for empty conditions also
		// test dispensary matching info
		// test cart data
		// test user can checkout, the correct function is called
		// test for any edge case error
	});

	let spy: jest.SpyInstance;
	afterEach(() => {
		spy?.mockClear();
	});

	it('renders without crashing', () => {
		const wrapper = shallow(<Checkout />);
		expect(wrapper).toBeDefined();
	});

	// it('Checkout component is defined', () => {
	// 	const checkout = shallow<Checkout>(<Checkout {...props} />);
	// 	expect(checkout).toBeDefined();
	// });

	// it('Checkout component calls getCartData on mount', () => {
	// 	const checkout = mount<Checkout>(<Checkout {...props} />);
	// 	spy = jest.spyOn(checkout.instance(), 'getCartData');

	// 	expect(checkout).toBeDefined();
	// 	checkout.instance().getCartData();
	// 	expect(spy).toHaveBeenCalled();
	// });

	// it('Checkout component loads the cart crawler config', () => {
	// 	const checkout = shallow<Checkout>(<Checkout {...props} />);
	// 	expect(checkout).toBeDefined();

	// 	// set checkout prop: useDutchie: false 10min
	// 	// call checkout.getCartData(); 20min
	// 	// expect checkout crawler to load the correct config how to detect it?
	// 	// test the case result of switch statement
	// });

	// it('Checkout component loads the dutchie-checkout crawler config', () => {
	// 	const checkout = shallow<Checkout>(<Checkout {...props} />);
	// 	expect(checkout).toBeDefined();

	// 	// set checkout prop: useDutchie: true
	// 	// call checkout.getCartData();
	// 	// expect checkout crawler to load the correct config how to detect it?
	// 	// test the case result of switch statement
	// });

	// it('Checkout component calls handleCheckout on click event', () => {
	// 	const checkout = mount<Checkout>(<Checkout {...props} />);
	// 	spy = jest.spyOn(checkout.instance(), 'handleCheckout');

	// 	expect(checkout).toBeDefined();
	// 	checkout.simulate('click');
	// 	expect(spy).toHaveBeenCalled();
	// });

	// // PLACEHOLDER
	// it('Checkout method handleCheckout to generate a cookie after valid cart', () => {
	// 	// const checkout = mount<Checkout>(<Checkout {...props} />);
	// 	// spy = jest.spyOn(checkout.instance(), 'handleCheckout');

	// 	// expect(checkout).toBeDefined();
	// 	// checkout.simulate('click');
	// 	// expect(spy).toHaveBeenCalled();
	// 	expect(1).toStrictEqual(1);
	// });

	// // PLACEHOLDER
	// it('Checkout method handleCheckout to redirect window after valid cart', () => {
	// 	// const checkout = mount<Checkout>(<Checkout {...props} />);
	// 	// spy = jest.spyOn(checkout.instance(), 'handleCheckout');

	// 	// expect(checkout).toBeDefined();
	// 	// checkout.simulate('click');
	// 	// expect(spy).toHaveBeenCalled();
	// 	expect(1).toStrictEqual(1);
	// });

	// // PLACEHOLDER
	// it('Checkout method handleCheckout does not generate cookie after invalid /empty cart', () => {
	// 	// const checkout = mount<Checkout>(<Checkout {...props} />);
	// 	// spy = jest.spyOn(checkout.instance(), 'handleCheckout');

	// 	// expect(checkout).toBeDefined();
	// 	// checkout.simulate('click');
	// 	// expect(spy).toHaveBeenCalled();
	// 	expect(1).toStrictEqual(1);
	// });

	// // PLACEHOLDER
	// it('Checkout method handleCheckout does not redirect window after invalid /empty cart', () => {
	// 	// const checkout = mount<Checkout>(<Checkout {...props} />);
	// 	// spy = jest.spyOn(checkout.instance(), 'handleCheckout');

	// 	// expect(checkout).toBeDefined();
	// 	// checkout.simulate('click');
	// 	// expect(spy).toHaveBeenCalled();
	// 	expect(1).toStrictEqual(1);
	// });
});
