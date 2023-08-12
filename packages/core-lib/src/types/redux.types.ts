import { type Store } from '@reduxjs/toolkit';
import { type BlogStateProps } from '../reduxDir/features/blog.reducer';
import { type CartStateProps } from '../reduxDir/features/cart.reducer';
import { type DriverSessionState } from '../reduxDir/features/driver.reducer';
import { type LocationStateProps } from '../reduxDir/features/location.reducer';
import { type ModalStateProps } from '../reduxDir/features/modal.reducer';
import { type ShopStateProps } from '../reduxDir/features/shop.reducer';
import { type SocketStateType } from '../reduxDir/features/socket.reducer';
import { type UserStateProps } from '../reduxDir/features/user.reducer';

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
