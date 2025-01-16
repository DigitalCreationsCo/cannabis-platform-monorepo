/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
type OrderCreateType = any;
type OrganizationWithShopDetails = any;
type ProductVariantWithDetails = any;
import {
	createAsyncThunk,
	createSlice,
	type AnyAction,
	type Dispatch,
	type PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {
	type AppState,
	type SimpleCart,
	type ThunkArgumentsType,
} from '../types';
import { calculateSalePrice, pruneData, urlBuilder } from '../utils';
import { type ShopStateProps } from './shop.reducer';
import { type UserStateProps } from './user.reducer';
// import { NavigationService } from "../../navigation";
// import { AppScreen, TabScreen } from "../../navigation/navigationPaths";
// import { messageActions } from "./message";
// import { modalActions } from "./modal";
// import { paymentActions } from "./payment";
// import socket, { socketActions } from "./socket";
// import { userActions } from "./user";
// import ObjectID from "bson-objectid";
// import {
//   TextContent,
//   locationTypes,
//   messageTypes,
//   modalTypes,
// } from "@cannabis_delivery/component_dispensary.constants";
// import {
//   fetchData,
//   urlList,
// } from "@cannabis_delivery/component_dispensary.utils";

export const addItem = createAsyncThunk<
	ProductVariantWithDetails[],
	ProductVariantWithDetails[],
	{ dispatch: Dispatch<AnyAction>; extra: ThunkArgumentsType }
>('cart/addItem', async (addItem, { getState, _, rejectWithValue }) => {
	try {
		const { cart } = getState() as { cart: CartStateProps };

		const itemDispensaryAndCartDispensaryConflict = !(
			cart.order.organizationId === addItem[0].organizationId ||
			cart.order.organizationId === ''
		);
		if (itemDispensaryAndCartDispensaryConflict) {
			console.info('item and cart dispensary conflict');
			// const confirmAddToCart = await dispatch(
			//   modalActions.launchConfirmModal({
			//     modalType: modalTypes.confirmationModal,
			//     modalText: TextContent.CONFIRM_ADD_TO_CART,
			//   })
			// );
			// if (confirmAddToCart.payload) {
			//   console.info("* clear cart state and add the new items");
			//   await thunkAPI.dispatch(cartActions.clearCartState());
			//   NavigationService.goBack();
			//   return addingItem;
			// } else {
			//   console.info("Dont add to cart -- do nothing");
			//   return thunkAPI.rejectWithValue("user declined add to cart");
			// }

			// return rejectWithValue("declined add to cart");
		} else {
			// NavigationService.goBack();
			return addItem;
		}
	} catch (error) {
		console.info('add item to cart error: ', error);
		return rejectWithValue('item was not added to cart');
	}
});

// export const addOrderVendor = createAsyncThunk(
//   "cart/addOrderVendor",
//   async (vendorId, thunkAPI) => {
//     try {
//       const response = await fetchData(urlList.GET_VENDOR_FOR_ORDER(vendorId), {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.status === 200) {
//         let data = await response.json();
//         // console.info("orderVendor data? ", data);
//         return data;
//       }
//     } catch (error) {
//       console.info("A general error occured: addOrderVendor-", error);
//       thunkAPI.rejectWithValue(
//         "A general error occured: addOrderVendor-",
//         error
//       );
//     }
//   }
// );

export const createOrderForCheckout = createAsyncThunk<OrderCreateType, void>(
	'cart/createOrderForCheckout',
	async (_, thunkAPI) => {
		try {
			const cart = thunkAPI.getState().cart as CartStateProps;

			let { user } = thunkAPI.getState().user as UserStateProps;
			user = pruneData(user, ['memberships', 'idFrontImage', 'idBackImage']);

			const { dispensaries } = thunkAPI.getState().shop as ShopStateProps;

			let organization = dispensaries.find((d) => d.id === cart.organizationId);

			if (!organization) {
				console.debug('fetching organization from server');
				const response = await axios(
					urlBuilder.shop + `/api/organization/${cart.organizationId}`
				);
				if (response.data.success === 'false')
					throw new Error(response.data.error);
				organization = response.data.payload as OrganizationWithShopDetails;
			}

			if (!organization?.id)
				throw new Error(
					'Could not get your Dispensary details. Please try again.'
				);

			// const location = thunkAPI.getState().location as LocationStateProps;
			// const { selectLocationType } = location,
			// 	selectedLocation = location[selectLocationType] as LocationType;

			const order: OrderCreateType = {
				subtotal: cart.subtotal,
				total: cart.total,
				taxFactor: 0,
				taxAmount: 0,
				orderStatus: 'Pending',
				// addressId: selectedLocation.address.id,
				addressId: user.address[0].id,
				// destinationAddress: selectedLocation.address,
				destinationAddress: user.address[0],
				customerId: user.id,
				customer: pruneData(user, ['address', 'profilePicture']),
				organizationId: cart.organizationId,
				organization: pruneData(organization, [
					'schedule',
					'products',
					'images',
					'siteSetting',
					'categories',
					'categoryList',
					'subdomain',
					'metadata',
				]),
				items: await processCartItemsForCheckout(cart.cart),
			};

			return thunkAPI.fulfillWithValue(order);
		} catch (error) {
			console.info('createOrderForCheckout: ', error);
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

// export const createOrderForCheckout = createAsyncThunk(
//   "cart/createOrderForCheckout",
//   async (_, thunkAPI) => {
//     try {
//       const { cart, cartVendorId, subTotal } = thunkAPI.getState().cart;
//       const { user } = thunkAPI.getState().user;
//       const {
//         email,
//         password,
//         orderHistory,
//         preferences,
//         recentlyViewedVendors,
//         recentlyViewedProducts,
//         locationData,
//         ...customer
//       } = user;
//       // prepare customer data for order
//       // currentLocation will have data filled in from realTimeLocation update API call
//       // homeLocation will have data filled in from database
//       // if giftLocation, skip this clause, and inherit the location
//       let { selectedLocationType } = locationData;
//       let { address, location, locationType } =
//         locationData[selectedLocationType];
//       customer.location = { locationType, ...location };
//       customer.address = address;
//       const trimProductsData = cart.map(
//         ({ medImage, smImage, reviews, productCategory, ...productInfo }) =>
//           productInfo
//       );
//       const { payload } = await thunkAPI.dispatch(addOrderVendor(cartVendorId));
//       // remove products field from this vendor in backend
//       const { products, rating, tag, ...vendor } = payload;
//       if (payload.error) {
//         console.info(
//           "A general error occured retreiving vendor: addOrderVendor-",
//           payload.error
//         );
//         return thunkAPI.rejectWithValue(
//           "A general error occured retreiving vendor: addOrderVendor-",
//           payload.error
//         );
//       }
//       const orderId = ObjectID().toString();
//       console.info("new order Id? ", orderId);
//       console.info("order vendor ? ", vendor);
//       // console.info("order subtotal ? ", subTotal);
//       return {
//         order: {
//           orderId,
//           customer,
//           vendor,
//           products: trimProductsData,
//           subTotal,
//         },
//       };
//     } catch (error) {
//       console.info("A general error occured: createOrderForCheckout-", error);
//       thunkAPI.rejectWithValue(
//         "A general error occured: createOrderForCheckout-",
//         error
//       );
//     }
//   }
// );

// export const submitOrder = createAsyncThunk(
//   "cart/submitOrder",
//   async (_, thunkAPI) => {
//     try {
//       // try sending order for dispatch before handling payment.
//       // this is a way to guarantee that orders
//       // are submitted for fulfillment before we take any payment
//       // from a customer!

//       const { order } = thunkAPI.getState().cart;
//       // console.info("submitting order: ", order);
//       let { orderId } = order;
//       // create socket connection to dispatch server
//       thunkAPI.dispatch(socketActions.startConnecting(orderId));
//       // test receiving an error from API
//       const { payload } = await thunkAPI.dispatch(
//         paymentActions.purchaseOrder({ order })
//       );
//       if (payload) {
//         await thunkAPI.dispatch(
//           messageActions.handleMessageBanner({
//             messageType: messageTypes.CART_MESSAGE,
//             message: TextContent.PAYMENT_SUCCESSFUL,
//           })
//         );
//         await thunkAPI.dispatch(socketActions.placeDispatchOrder({ order }));
//         thunkAPI.dispatch(cartActions.clearCartState());
//         NavigationService.navigate(TabScreen.ORDER_SCREEN);
//       } else {
//         thunkAPI.rejectWithValue(
//           "A general error occured: submitOrder-",
//           error
//         );
//       }
//       // navigate to HomeScreen
//       // NavigationService.navigate("HomeScreen");
//     } catch (error) {
//       console.info("A general error occured: submitOrder-", error);
//       thunkAPI.rejectWithValue("A general error occured: submitOrder-", error);
//     }
//   }
// );

export interface CartStateProps {
	order: OrderCreateType;
	dispensaryName: string | undefined;
	organizationId: string | undefined;
	cart: ProductVariantWithDetails[];
	totalItems: number;
	subtotal: number;
	total: number;
	taxFactor: number;
	taxAmount: number;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMessage: string;
}

const initialState: CartStateProps = {
	order: {
		id: '',
		subtotal: 0,
		total: 0,
		taxFactor: 0,
		taxAmount: 0,
		orderStatus: null,
		purchaseId: null,
		customerId: '',
		customer: null,
		organizationId: '',
		organization: null,
		addressId: '',
		destinationAddress: {
			id: '',
			street1: '',
			street2: '',
			city: '',
			state: '',
			zipcode: '',
			country: '',
			countryCode: '',
			userId: '',
			organizationId: '',
			coordinates: {
				id: '',
				latitude: 0,
				longitude: 0,
				radius: 0,
			},
		},
		driverId: '',
		driver: null,
		isDeliveredOrder: false,
		isCustomerReceivedOrder: false,
		isCompleted: false,
		deliveredAt: null,
		items: [],
	},
	dispensaryName: '',
	organizationId: '',
	cart: [],
	totalItems: 0,
	subtotal: 0,
	total: 0,
	taxFactor: 0,
	taxAmount: 0,
	isLoading: false,
	isSuccess: false,
	isError: false,
	errorMessage: '',
};

// dummy cart
// const dummyState: CartStateProps = {
//   order: {
//       subtotal: 3140,
//       total: 0,
//       taxFactor: 0,
//       tax: 0,
//       orderStatus: null,
//       addressId: '',
//       customerId: '',
//       organizationId: '234',
//   },
//   orderDispensaryName: '',
//   cart: [{
//     id: '12355',
//     organizationId: '234',
//     organizationName: 'Curaleaf',
//     variantId: '1111',
//     productId: '234565',
//     name: "Edible Donka",
//     unit: 'g',
//     size: 3.5,
//     quantity: 1,
//     basePrice: 3488,
//     discount: 10,
//     isDiscount: true,
//     salePrice: 3140,
//     currency: 'USD',
//   }],
//   totalItems: 1,
//   subtotal: 3140,
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
//   errorMessage: "",
// };

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		saveSimpleCart: (state, { payload }: PayloadAction<SimpleCart>) => {
			const simpleCart = payload;
			state.cart = simpleCart.cartItems;
			state.subtotal = simpleCart.subtotal;
			state.taxAmount = simpleCart.tax;
			state.total = simpleCart.total;
			state.organizationId = simpleCart.organizationId;
			state.dispensaryName = simpleCart.organizationName;
			state.order.organizationId = simpleCart.organizationId;

			state.totalItems = countTotalItems(state.cart);
			state.subtotal = countCartSubtotal(state.cart);
		},

		clearState: () => initialState,

		emptyCart: (state) => {
			state.cart = [];
			state.dispensaryName = '';
			state.organizationId = '';
			state.totalItems = 0;
			state.subtotal = 0;
			state.total = 0;
			state.taxFactor = 0;
			state.taxAmount = 0;
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.errorMessage = '';
		},

		updateItem: (
			state,
			{ payload }: PayloadAction<ProductVariantWithDetails>
		) => {
			const itemInCart = state.cart.find(
				(item) => item.id == payload.id
			) as ProductVariantWithDetails;
			const index = state.cart.indexOf(itemInCart);

			if (index !== -1) {
				state.cart[index] = payload;
				state.totalItems = countTotalItems(state.cart);
				state.subtotal = countCartSubtotal(state.cart);
			}
		},

		removeItem: (state, { payload }: PayloadAction<string>) => {
			const removeId = payload;
			const newCart = state.cart.filter((item) => item.id !== removeId);
			state.cart = newCart;
			state.totalItems = countTotalItems(state.cart);
			state.subtotal = countCartSubtotal(state.cart);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addItem.fulfilled, (state, { payload }) => {
			const addItems = payload;
			if (state.order.organizationId === '') {
				state.order.organizationId = addItem[0].organizationId;
				state.orderDispensaryName = addItem[0].organizationName;
			}

			addItems.forEach((addItem) => {
				const item = state.cart.find((item) => item.id == addItem.id);
				// no item match -> add item
				if (!item) {
					state.cart.push(addItem);
				}
				// item match and variant match -> add quantity
				if (item && item.variantId === addItem.variantId) {
					item.quantity += addItem.quantity;
				}
				// item match and variant dont match ( possibly due to lacking data ?? ) -> add item
				if (item && item.variantId !== addItem.variantId) {
					state.cart.push(addItem);
				}
			});

			state.totalItems = countTotalItems(state.cart);
			state.subtotal = countCartSubtotal(state.cart);
		}),
			builder.addCase(addItem.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
				state.isError = false;
			}),
			builder.addCase(addItem.rejected, (state, { payload }) => {
				const error = payload as string;
				console.info('add item to cart error: ', error);

				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.errorMessage = error;
			}),
			builder.addCase(
				createOrderForCheckout.fulfilled,
				(state, { payload }) => {
					state.order = payload;

					state.isLoading = false;
					state.isSuccess = true;
					state.isError = false;
				}
			),
			builder.addCase(createOrderForCheckout.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
				state.isError = false;
			}),
			builder.addCase(createOrderForCheckout.rejected, (state, { payload }) => {
				const error = payload as string;

				state.isLoading = false;
				state.isSuccess = false;
				state.isError = true;
				state.errorMessage = error;
			});

		// [addOrderVendor.fulfilled]: (state) => {},
		// [addOrderVendor.pending]: (state) => {},
		// [addOrderVendor.rejected]: (state) => {},

		// [createOrderForCheckout.fulfilled]: (state, { payload }) => {
		//   // console.info("checkout payload ? ", payload);
		//   const { order } = payload;
		//   // console.info("created order for checkout ? ", order);
		//   // console.info("created checkout order fulfilled");
		//   // console.info("order customer ? ", order.customer);
		//   state.order = order;
		// },
		// [createOrderForCheckout.pending]: (state) => {},
		// [createOrderForCheckout.rejected]: (state) => {},

		// [submitOrder.fulfilled]: (state) => {
		//   state.isLoading = false;
		// },
		// [submitOrder.pending]: (state) => {
		//   state.isLoading = true;
		// },
		// [submitOrder.rejected]: (state) => {
		//   state.isLoading = false;
		// },
	},
});

function countTotalItems(itemList: ProductVariantWithDetails[]) {
	return itemList.reduce((sum, item) => sum + Number(item.quantity), 0);
}

function countCartSubtotal(itemList: ProductVariantWithDetails[]) {
	return itemList.reduce((sum, item) => sum + getItemDiscountPrice(item), 0);
}

function getItemDiscountPrice(item: ProductVariantWithDetails) {
	let discount = 0;
	if (
		item.discount !== discount &&
		item.discount !== null &&
		item.discount !== undefined
	) {
		discount = item.discount;
		return calculateSalePrice(item.basePrice, item.isDiscount, discount);
	} else return item.basePrice;
}

async function processCartItemsForCheckout(items: ProductVariantWithDetails[]) {
	return items.map((item) => ({
		...item,
		salePrice: getItemDiscountPrice(item),
	}));
}

export const cartActions = {
	addItem,
	//   addOrderVendor,
	createOrderForCheckout,
	//   submitOrder,
	...cartSlice.actions,
};

export const cartReducer = cartSlice.reducer;

export const selectCartState = (state: AppState) => state.cart;
export const selectIsCartEmpty = (state: AppState): boolean =>
	state.cart.totalItems < 1;
