import { type Store } from '@reduxjs/toolkit';
import { type BlogStateProps } from '../features/blog.reducer';
import { type CartStateProps } from '../features/cart.reducer';
import { type DriverSessionState } from '../features/driver.reducer';
import { type LocationStateProps } from '../features/location.reducer';
import { type ModalStateProps } from '../features/modal.reducer';
import { type ShopStateProps } from '../features/shop.reducer';
import { type SocketStateType } from '../features/socket.reducer';
import { type UserStateProps } from '../features/user.reducer';

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
