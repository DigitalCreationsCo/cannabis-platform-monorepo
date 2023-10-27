/* eslint-disable @typescript-eslint/no-empty-function */
import {
	createAsyncThunk,
	createSlice,
	type AnyAction,
	type Dispatch,
} from '@reduxjs/toolkit';
import { type AppState, type ThunkArgumentsType } from '../types/redux.types';

// export type ThunkDispatch = TDispatch<void, {store: Store}, Action<any>>
// export type AsyncThunkPayloadCreatorType = AsyncThunkPayloadCreator<void, {}, {dispatch: Dispatch<AnyAction>; extra: {store:Store }}>
// export type AsyncThunkAction = AsyncThunkAction<unknown, {}, {}>;
// export type AllActions = AsyncThunkAction<unknown, {}, {}> & AnyAction;

const launchConfirmModal = createAsyncThunk<
	boolean,
	ModalActionPayload,
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
	ModalActionPayload,
	{ dispatch: Dispatch<AnyAction>; extra: ThunkArgumentsType }
>('modal/selectModalLocationType', async (modalProps, { dispatch, extra }) => {
	const store = extra.store;
	dispatch(modalActions.openModal(modalProps));
	// will have to call actions to do API calls in some cases here
	return new Promise((resolve) => {
		const unsubscribe = store.subscribe(() => {
			const { selectedLocationType } = store.getState().user.user.locationData;
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
	ModalActionPayload,
	{ dispatch: Dispatch<AnyAction>; extra: ThunkArgumentsType }
>('modal/launchTipModal', async (modalProps, { dispatch, extra }) => {
	dispatch(modalActions.openModal(modalProps));
	const store = extra.store;
	return new Promise((resolve) => {
		const unsubscribe = store.subscribe(() => {
			const { isSelected } = store.getState().modal;
			if (isSelected) {
				const { tipPercentage } = store.getState().payment;
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
	| 'CHECK_AGE_MODAL'
	| 'EMAIL_MODAL';

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

export type ModalActionPayload = {
	modalType: ModalType;
	modalText?: string;
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, { payload }: { payload: ModalActionPayload }) => {
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
		builder.addCase(launchConfirmModal.fulfilled, () => {}),
			builder.addCase(launchConfirmModal.pending, () => {}),
			builder.addCase(launchConfirmModal.rejected, () => {}),
			builder.addCase(launchSelectModalLocationType.fulfilled, () => {}),
			builder.addCase(launchSelectModalLocationType.pending, () => {}),
			builder.addCase(launchSelectModalLocationType.rejected, () => {}),
			builder.addCase(launchTipModal.fulfilled, () => {}),
			builder.addCase(launchTipModal.pending, () => {}),
			builder.addCase(launchTipModal.rejected, () => {});
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
