import {
	AnyAction,
	createAsyncThunk,
	createSlice,
	Dispatch,
} from '@reduxjs/toolkit';

import { AppState, ThunkArgumentsType } from '../types/reduxTypes';

// export type ThunkDispatch = TDispatch<void, {store: Store}, Action<any>>
// export type AsyncThunkPayloadCreatorType = AsyncThunkPayloadCreator<void, {}, {dispatch: Dispatch<AnyAction>; extra: {store:Store }}>

// export type AsyncThunkAction = AsyncThunkAction<unknown, {}, {}>;
// export type AllActions = AsyncThunkAction<unknown, {}, {}> & AnyAction;

const launchConfirmModal = createAsyncThunk<
	boolean,
	modalActionPayload,
	{ dispatch: Dispatch<AnyAction>; extra: ThunkArgumentsType }
>('modal/confirmModal', async (modalProps, { dispatch, extra }) => {
	const store = extra.store;
	dispatch(modalActions.openModal(modalProps));
	return new Promise<boolean>((resolve) => {
		const unsubscribe = store.subscribe(() => {
			const { isConfirmed, isDeclined } = store.getState().modal;
			if (isConfirmed) {
				unsubscribe();
				resolve(true);
			}
			if (isDeclined) {
				unsubscribe();
				resolve(false);
			}
		});
	});
});

const launchSelectModalLocationType = createAsyncThunk<
	boolean,
	modalActionPayload,
	{ dispatch: Dispatch<AnyAction>; extra: ThunkArgumentsType }
>('modal/selectModalLocationType', async (modalProps, { dispatch, extra }) => {
	const store = extra.store;
	dispatch(modalActions.openModal(modalProps));
	// will have to call actions to do API calls in some cases here
	return new Promise((resolve) => {
		const unsubscribe = store.subscribe(() => {
			const { selectedLocationType } = store.getState().user.user.locationData;
			// console.info("location type in select modal action ? ", locationType);
			const { isSelected } = store.getState().modal;
			if (isSelected && selectedLocationType) {
				unsubscribe();
				resolve(selectedLocationType);
			}
			// else unsubscribe();
		});
	});
});

const launchTipModal = createAsyncThunk<
	boolean,
	modalActionPayload,
	{ dispatch: Dispatch<AnyAction>; extra: ThunkArgumentsType }
>('modal/launchTipModal', async (modalProps, { dispatch, extra }) => {
	dispatch(modalActions.openModal(modalProps));
	const store = extra.store;
	return new Promise((resolve) => {
		const unsubscribe = store.subscribe(() => {
			const { isSelected } = store.getState().modal;
			if (isSelected) {
				const { tipPercentage } = store.getState().payment;
				console.info('launch modal tip percentage from modal: ', tipPercentage);
				unsubscribe();
				resolve(tipPercentage);
			}
			// else unsubscribe();
		});
	});
});

export type ModalType =
	| 'SHOW_MODAL'
	| 'CONFIRM_MODAL'
	| 'SELECT_MODAL'
	| 'TIP_MODAL'
	| 'MESSAGE_BANNER'
	| 'CART_MODAL'
	| 'LOGIN_MODAL'
	| 'CHECKOUT_MODAL'
	| 'CHECK_AGE_MODAL';

export type ModalStateProps = {
	modalType: ModalType;
	modalVisible: boolean;
	modalText?: string;
	isLoading?: boolean;
	isConfirmed?: boolean;
	isDeclined?: boolean;
	isSelected?: boolean;
	errorMessage: string;
};

const initialState: ModalStateProps = {
	modalType: 'SHOW_MODAL',
	modalVisible: false,
	modalText: '',
	isLoading: false,
	isConfirmed: false,
	isDeclined: false,
	isSelected: false,
	errorMessage: '',
};

export type modalActionPayload = {
	modalType: ModalType;
	modalText?: string;
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, { payload }: { payload: modalActionPayload }) => {
			console.info('modaltype: ', payload.modalType);
			console.info('modalText: ', payload.modalText);
			state.modalType = payload.modalType || state.modalType;
			state.modalText = payload.modalText || state.modalText;
			state.modalVisible = true;
		},
		closeModal: () => initialState,
		waitLoading: (state) => {
			state.isLoading = true;
		},
		confirm: (state) => {
			state.isConfirmed = true;
			state.modalVisible = false;
			state.isLoading = false;
		},
		decline: (state) => {
			state.isDeclined = true;
			state.modalVisible = false;
			state.isLoading = false;
		},
		select: (state) => {
			state.isSelected = true;
			state.modalVisible = false;
			state.isLoading = false;
		},
		clearModalState: () => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(launchConfirmModal.fulfilled, (state, { payload }) => {
			console.info('confirm modal payload: ', payload);
		}),
			builder.addCase(launchConfirmModal.pending, (state) => {}),
			builder.addCase(launchConfirmModal.rejected, (state) => {}),
			builder.addCase(
				launchSelectModalLocationType.fulfilled,
				(state, { payload }) => {}
			),
			builder.addCase(launchSelectModalLocationType.pending, (state) => {}),
			builder.addCase(launchSelectModalLocationType.rejected, (state) => {}),
			builder.addCase(launchTipModal.fulfilled, (state, { payload }) => {
				console.info('tip modal payload: ', payload);
			}),
			builder.addCase(launchTipModal.pending, (state) => {}),
			builder.addCase(launchTipModal.rejected, (state) => {});
	},
});

export const modalActions = {
	launchConfirmModal,
	launchSelectModalLocationType,
	launchTipModal,
	...modalSlice.actions,
};

export const modalReducer = modalSlice.reducer;

export const selectModalState = (state: AppState) => state.modal;
