/* eslint-disable jest/no-commented-out-tests */
import { type AppState } from '@cd/core-lib';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TopBar from '../../components/TopBar';

describe('<Checkout />', () => {
	let props: any;
	let initialState: any;
	let Checkout: any;
	let store: any;

	const mockStore = configureStore({
		useDispatchMock: () => jest.fn(),
		useSelectorMock: () => jest.fn(),
	});

	let spy: jest.SpyInstance;

	beforeEach(() => {
		initialState = {
			user: {
				isSignedIn: true,
				user: {
					profilePicture: {
						location:
							'https://storage.cloud.google.com/image-user/avatar1.png?authuser=1',
					},
					email: 'email@user.com',
				},
			},
			cart: {
				totalItems: 5,
			},
		} as unknown as AppState;

		// mock redux store with a valid order, and valid user
		// test renderAddress is called, with matching address
		// test user delivery info is valid
		// test for non match conditions also
		// test for empty conditions also
		// test dispensary matching info
		// test cart data
		// test user can checkout, the correct function is called
		// test for any edge case error

		store = mockStore(initialState);
		Checkout = shallow(
			<Provider store={store}>
				<TopBar {...props} />
			</Provider>,
		);
	});

	afterEach(() => {
		spy?.mockClear();
	});

	it('renders without crashing', () => {
		expect(Checkout).toBeDefined();
	});

	// ADD TESTS
	// USER CANNOT CHECKOUT IF CART IS EMPTY
	// USER CANNOT CHECKOUT IF CART IS INVALID
	// USER CANNOT CHECKOUT IF USER IS INVALID
	// USER CANNOT CHECKOUT IF USER IS NOT SIGNED IN
	// USER CANNOT CHECKOUT IF USER IS NOT VERIFIED
	// USER CANNOT CHECKOUT IF USER IS NOT 21
	// USER CANNOT CHECKOUT IF ADDRESS IS INVALID
	// USER CANNOT CHECKOUT IF DISPENSARY IS INVALID
	// USER CANNOT CHECKOUT IF DISPENSARY IS NOT OPEN
	// USER CANNOT CHECKOUT IF DISPENSARY IS NOT AVAILABLE FOR DELIVERY

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
