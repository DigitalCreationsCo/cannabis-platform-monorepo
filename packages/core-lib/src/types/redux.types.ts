type ProductVariantWithDetails = any;
import {
	type Action,
	type ThunkAction,
	type Dispatch,
	type Store,
} from '@reduxjs/toolkit';
import {
	useDispatch,
	type TypedUseSelectorHook,
	useSelector,
} from 'react-redux';
import { type BlogStateProps } from '../reducer/blog.reducer';
import { type CartStateProps } from '../reducer/cart.reducer';
import { type DispensaryStateProps } from '../reducer/dispensary.reducer';
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
	dispensary: DispensaryStateProps;
}>;

export interface ThunkArgumentsType {
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
}

export interface SimpleCart {
	subtotal?: number;
	tax?: number;
	discount?: number;
	total: number;
	cartItems: ProductVariantWithDetails[];
	organizationId?: string;
	organizationName?: string;
}

export type AppStore = Store<AppState>;
export type AppDispatch = Dispatch<any>;
export type AppAction = Action<any> | AppThunk;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
