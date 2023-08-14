import { type Store } from '@reduxjs/toolkit';
import { type BlogStateProps } from '../reducer/blog.reducer';
import { type CartStateProps } from '../reducer/cart.reducer';
import { type DriverSessionState } from '../reducer/driver.reducer';
import { type LocationStateProps } from '../reducer/location.reducer';
import { type ModalStateProps } from '../reducer/modal.reducer';
import { type ShopStateProps } from '../reducer/shop.reducer';
import { type SocketStateType } from '../reducer/socket.reducer';
import { type UserStateProps } from '../reducer/user.reducer';

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
