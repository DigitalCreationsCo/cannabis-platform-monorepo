import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const openModal = createAsyncThunk("modal/openModal", async (args: unknown) => {
  return args;
});

const launchConfirmModal = createAsyncThunk(
  "modal/confirmModal",
  async (modalProps, { dispatch, extra }) => {
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
        // unsubscribe();
      });
    });
  }
);

const launchSelectModalLocationType = createAsyncThunk(
  "modal/selectModalLocationType",
  async (modalProps, { dispatch, extra }) => {
    const store = extra.store;
    dispatch(modalActions.openModal(modalProps));
    // will have to call actions to do API calls in some cases here
    return new Promise((resolve) => {
      const unsubscribe = store.subscribe(() => {
        const { selectedLocationType } =
          store.getState().user.user.locationData;
        // console.log("location type in select modal action ? ", locationType);
        const { isSelected } = store.getState().modal;
        if (isSelected && selectedLocationType) {
          unsubscribe();
          resolve(selectedLocationType);
        }
        // else unsubscribe();
      });
    });
  }
);

const launchTipModal = createAsyncThunk(
  "modal/launchTipModal",
  async (modalProps, { dispatch, extra }) => {
    dispatch(modalActions.openModal(modalProps));
    const store = extra.store;
    return new Promise((resolve) => {
      const unsubscribe = store.subscribe(() => {
        const { isSelected } = store.getState().modal;
        console.log("is selected: ", isSelected);
        if (isSelected) {
          const { tipPercentage } = store.getState().payment;
          console.log(
            "launch modal tip percentage from modal: ",
            tipPercentage
          );
          console.log("resolving modal value..");
          unsubscribe();
          resolve(tipPercentage);
        }
        // else unsubscribe();
      });
    });
  }
);

const initialState:ModalProps = {
  modalType: "",
  modalVisible: false,
  modalText: "",
  isLoading: false,
  isConfirmed: false,
  isDeclined: false,
  isSelected: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
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
    builder.addCase(openModal.fulfilled, (state, { payload }) => {
      const { modalType, modalText = "" } = payload;
      // console.log("modaltype: ", modalType);
      // console.log("modalText: ", modalText);
      state.modalType = modalType;
      state.modalText = modalText;
      state.modalVisible = true;
    })
    builder.addCase(openModal.pending, (state) => {}),
    builder.addCase(openModal.rejected, (state) => {}),

    builder.addCase(launchConfirmModal.fulfilled, (state, { payload }) => {
      console.log("confirm modal payload: ", payload);
    }),
    builder.addCase(launchConfirmModal.pending, (state) => {}),
    builder.addCase(launchConfirmModal.rejected, (state) => {}),

    builder.addCase(launchSelectModalLocationType.fulfilled, (state, { payload }) => {}),
    builder.addCase(launchSelectModalLocationType.pending, (state) => {}),
    builder.addCase(launchSelectModalLocationType.rejected, (state) => {}),

    builder.addCase(launchTipModal.fulfilled, (state, { payload }) => {
      console.log("tip modal payload: ", payload);
    }),
    builder.addCase(launchTipModal.pending, (state) => {}),
    builder.addCase(launchTipModal.rejected, (state) => {})
  },
});

export const modalActions = {
  openModal,
  launchConfirmModal,
  launchSelectModalLocationType,
  launchTipModal,
  ...modalSlice.actions,
};
export const modalReducer = modalSlice.reducer;