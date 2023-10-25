import {
	modalActions,
	selectModalState,
	type ModalStateProps,
	type ModalType,
} from '@cd/core-lib';
import { useMemo } from 'react';
import { connect, useSelector } from 'react-redux';
import CartModal from './CartModal';
import CheckAgeModal from './CheckAgeModal';
import CheckoutModal from './CheckoutModal';
import EmailModal from './EmailModal';
import LoginModal from './LoginModal/LoginModal';
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
	EMAIL_MODAL: EmailModal,
});

type ModalContainerProps = ModalStateProps & {
	dispatchCloseModal: () => void;
};

const ModalContainer = (props: ModalContainerProps) => {
	const modalState = useSelector(selectModalState);

	const modalType: ModalType = useMemo(
		() => modalState.modalType,
		[modalState],
	);

	const ModalComponent = useMemo(
		() => MODAL_COMPONENTS[modalType],
		[modalState.modalType],
	);

	if (!modalState.modalType && !modalState.modalVisible) return <></>;

	return <ModalComponent {...modalState} {...props} />;
};

const mapStateToProps = selectModalState;
const mapDispatchToProps = { dispatchCloseModal: modalActions.closeModal };

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
