import { modalActions, ModalStateProps, selectModalState } from '@cd/core-lib';
import { JSXElementConstructor, useMemo } from 'react';
import { connect, useSelector } from 'react-redux';
import CartModal from './CartModal';
import CheckAgeModal from './CheckAgeModal';
import CheckoutModal from './CheckoutModal';
import LoginModal from './LoginModal';
// import ConfirmModal from "./ConfirmModal";
// import MessageBanner from "./MessageBanner";
// import MessageModal from "./MessageModal";
// import SelectModal from "./SelectModal";
// import TipModal from "./TipModal";

const MODAL_COMPONENTS = Object.freeze({
	SHOW_MODAL: () => <></>,
	CONFIRM_MODAL: () => <></>,
	SELECT_MODAL: () => <></>,
	TIP_MODAL: () => <></>,
	MESSAGE_BANNER: () => <></>,
	CHECK_AGE_MODAL: CheckAgeModal,
	CHECKOUT_MODAL: CheckoutModal,
	CART_MODAL: CartModal,
	LOGIN_MODAL: LoginModal,
});

type ModalContainerProps = ModalStateProps & {
	dispatchCloseModal: () => void;
};

const ModalContainer = (props: ModalContainerProps) => {
	const modalState = useSelector(selectModalState);

	const ModalComponent = useMemo<JSXElementConstructor<ModalContainerProps>>(
		() => MODAL_COMPONENTS[modalState.modalType],
		[modalState.modalType],
	);

	if (!modalState.modalType && !modalState.modalVisible) return <></>;

	return <ModalComponent {...modalState} {...props} />;
};

const mapStateToProps = selectModalState;
const mapDispatchToProps = { dispatchCloseModal: modalActions.closeModal };

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
