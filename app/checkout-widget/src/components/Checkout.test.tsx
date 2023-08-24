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
});
