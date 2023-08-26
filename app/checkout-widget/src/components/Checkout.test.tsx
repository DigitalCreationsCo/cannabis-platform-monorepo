/* eslint-disable jest/expect-expect */
import { shallow } from 'enzyme';
import { type ViewProps } from '../types';
import Checkout from './Checkout';

describe('<Checkout />', () => {
	const props: ViewProps = {} as any;
	it('renders without crashing', () => {
		const wrapper = shallow(<Checkout {...props} />);
		expect(wrapper).toBeDefined();
	});

	// FIX THIS
	// it('expand calls crawler function', async () => {
	// 	const wrapper = shallow<Checkout>(<Checkout {...props} />);
	// 	wrapper.find('#View-Checkout').simulate('click');
	// 	wrapper.simulate('click');
	// 	const spy = jest.spyOn(wrapper.instance(), 'getCartData');
	// 	expect(spy).toHaveBeenCalled();
	// });

	it('Checkout crawler loads the correct config', () => {
		const checkout = shallow(<Checkout {...props} />);
		expect(checkout).toBeDefined();
		// set checkout prop: useDutchie: false 10min
		// call checkout.getCartData(); 20min
		// expect checkout crawler to load the correct config how to detect it?
		// test the case result of switch statement

		// set checkout prop: useDutchie: true
		// call checkout.getCartData();
		// expect checkout crawler to load the correct config how to detect it?
		// test the case result of switch statement
	});
});
