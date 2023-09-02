/* eslint-disable jest/no-commented-out-tests */
import { type AppState } from '@cd/core-lib';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { default as _TopBar, type TopBarProps } from '../../components/TopBar';

describe('Top Bar', () => {
	let props: TopBarProps;
	let initialState: any;
	let TopBar: any;
	let store: any;

	const mockStore = configureStore({
		useDispatchMock: () => jest.fn(),
		useSelectorMock: () => jest.fn(),
	});

	beforeEach(() => {
		props = {
			signOut: () => {},
		};

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

		store = mockStore(initialState);
		TopBar = mount(
			<Provider store={store}>
				<_TopBar {...props} />
			</Provider>,
		);
	});

	it('should be defined', () => {
		expect(TopBar).toBeDefined();
	});

	it('when user is signed in, should show Account Icon', () => {
		expect(TopBar.find('#Account-Icon')).toHaveLength(1);
	});

	it('when user is signed in, account icon will show DropDown on click', () => {
		expect(TopBar.find('#Account-Icon')).toHaveLength(1);
		TopBar.find('#Account-Icon').simulate('click');
		expect(TopBar.find('#Account-Dropdown')).toHaveLength(1);
	});

	// it('should initilizae form data context correctly', () => {});
	// it('should save form data context in cookie', () => {});
	// it('should set component state from cookie correctly', () => {});
	// it('should persist cookie form data from reload', () => {});
	// it('should render step hash in the url', () => {});
	// it('should change step hash in the url', () => {});
	// it('should set canProceed cookie to allow hash change', () => {});
	// it('should reset form data', () => {});
	// it('should clear form data cookie', () => {});
	// it('should clear canProceed cookie', () => {});
});
