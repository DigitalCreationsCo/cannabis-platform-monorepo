import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// export type ThunkDispatch = TDispatch<void, {store: Store}, Action<any>>
// export type AsyncThunkPayloadCreatorType = AsyncThunkPayloadCreator<void, {}, {dispatch: Dispatch<AnyAction>; extra: {store:Store }}>
// export type AsyncThunkAction = AsyncThunkAction<unknown, {}, {}>;
// export type AllActions = AsyncThunkAction<unknown, {}, {}> & AnyAction;
const launchConfirmModal = createAsyncThunk("modal/confirmModal", async (modalProps, { dispatch, extra }) => {
    const store = extra.store;
    dispatch(modalActions.openModal(modalProps));
    return new Promise((resolve) => {
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
const launchSelectModalLocationType = createAsyncThunk("modal/selectModalLocationType", async (modalProps, { dispatch, extra }) => {
    const store = extra.store;
    dispatch(modalActions.openModal(modalProps));
    // will have to call actions to do API calls in some cases here
    return new Promise((resolve) => {
        const unsubscribe = store.subscribe(() => {
            const { selectedLocationType } = store.getState().user.user.locationData;
            // console.log("location type in select modal action ? ", locationType);
            const { isSelected } = store.getState().modal;
            if (isSelected && selectedLocationType) {
                unsubscribe();
                resolve(selectedLocationType);
            }
            // else unsubscribe();
        });
    });
});
const launchTipModal = createAsyncThunk("modal/launchTipModal", async (modalProps, { dispatch, extra }) => {
    dispatch(modalActions.openModal(modalProps));
    const store = extra.store;
    return new Promise((resolve) => {
        const unsubscribe = store.subscribe(() => {
            const { isSelected } = store.getState().modal;
            if (isSelected) {
                const { tipPercentage } = store.getState().payment;
                console.log("launch modal tip percentage from modal: ", tipPercentage);
                unsubscribe();
                resolve(tipPercentage);
            }
            // else unsubscribe();
        });
    });
});
const initialState = {
    modalType: "",
    modalVisible: false,
    modalText: "",
    isLoading: false,
    isConfirmed: false,
    isDeclined: false,
    isSelected: false,
    errorMessage: ""
};
const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, { payload }) => {
            console.log("modaltype: ", payload.modalType);
            console.log("modalText: ", payload.modalText);
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
            console.log("confirm modal payload: ", payload);
        }),
            builder.addCase(launchConfirmModal.pending, (state) => { }),
            builder.addCase(launchConfirmModal.rejected, (state) => { }),
            builder.addCase(launchSelectModalLocationType.fulfilled, (state, { payload }) => { }),
            builder.addCase(launchSelectModalLocationType.pending, (state) => { }),
            builder.addCase(launchSelectModalLocationType.rejected, (state) => { }),
            builder.addCase(launchTipModal.fulfilled, (state, { payload }) => {
                console.log("tip modal payload: ", payload);
            }),
            builder.addCase(launchTipModal.pending, (state) => { }),
            builder.addCase(launchTipModal.rejected, (state) => { });
    },
});
export const modalActions = {
    launchConfirmModal,
    launchSelectModalLocationType,
    launchTipModal,
    ...modalSlice.actions,
};
export const modalReducer = modalSlice.reducer;
export const selectModalState = (state) => state.modal;
//# sourceMappingURL=modal.reducer.js.map