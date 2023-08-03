import { Store } from '@reduxjs/toolkit';
import { BlogStateProps } from '../features/blog.reducer';
import { CartStateProps } from '../features/cart.reducer';
import { DriverSessionState } from '../features/driver.reducer';
import { LocationStateProps } from '../features/location.reducer';
import { ModalStateProps } from '../features/modal.reducer';
import { ShopStateProps } from '../features/shop.reducer';
import { SocketStateType } from '../features/socket.reducer';
import { UserStateProps } from '../features/user.reducer';

export type AppState = Readonly<{
	modal: ModalStateProps;
	user: UserStateProps;
	driver: DriverSessionState;
	location: LocationStateProps;
	shop: ShopStateProps;
	blog: BlogStateProps;
	cart: CartStateProps;
	socket: SocketStateType;
}>;

export type ThunkArgumentsType = {
	store: Store;
	supertokens: {
		signUp?: any;
		signIn?: any;
		signOut: any;
	};
	navigation?: {
		navigate: (routename: any, params: any) => void;
		goBack: () => void;
	};
};
