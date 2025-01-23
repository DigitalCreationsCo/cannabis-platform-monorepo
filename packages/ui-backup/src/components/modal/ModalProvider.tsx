"use client"
import {
	modalActions,
	selectModalState,
	type ModalStateProps,
	type ModalType,
} from '../../../../core/src/reducer';
import { useMemo } from 'react';
import { connect } from 'react-redux';
import CartModal from './CartModal';
import CheckAgeModal from './CheckAgeModal';
import CheckoutModal from './CheckoutModal';
import EmailModal from './EmailModal';
import LoginModal from './LoginModal/LoginModal';
import MessageModal from './MessageModal';
import NewDailyDealModal from './NewDailyDeal';
import StoreFrontModal from './StoreFrontModal';
import UserSignupModal from './UserSignupModal';
// import ConfirmModal from "./ConfirmModal";
// import MessageBanner from "./MessageBanner";
// import MessageModal from "./MessageModal";
// import SelectModal from "./SelectModal";
// import TipModal from "./TipModal";

const MODAL_COMPONENTS =
	// typeof values of modalTypes object
	Object.freeze<Record<ModalType, React.FC<ModalStateProps>>>({
		SHOW_MODAL: MessageModal,
		CONFIRM_MODAL: () => <></>,
		SELECT_MODAL: () => <></>,
		TIP_MODAL: () => <></>,
		MESSAGE_BANNER: () => <></>,
		CHECK_AGE_MODAL: CheckAgeModal,
		CHECKOUT_MODAL: CheckoutModal,
		CART_MODAL: CartModal,
		LOGIN_MODAL: LoginModal,
		EMAIL_MODAL: EmailModal,
		NEW_DAILY_DEAL_MODAL: NewDailyDealModal,
		STOREFRONT_MODAL: StoreFrontModal,
		SHOP_SIGN_UP_MODAL: UserSignupModal,
	});

type ModalContainerProps = ModalStateProps & {
	dispatchCloseModal: () => void;
};

const ModalContainer = ({
	modalVisible = false,
	...props
}: ModalContainerProps) => {
	const modalType: ModalType = useMemo(
		() => props.modalType,
		[modalVisible, props]
	);

	const ModalComponent = useMemo(
		() => MODAL_COMPONENTS[modalType],
		[props.modalType]
	);

	if (typeof modalVisible == 'undefined') return <></>;

	return <ModalComponent modalVisible={modalVisible} {...props} />;
};

const mapStateToProps = selectModalState;
const mapDispatchToProps = { dispatchCloseModal: modalActions.closeModal };

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
