import { type ModalType } from '../reducer/modal.reducer';

export const modalTypes = Object.freeze<Record<string, ModalType>>({
	showModal: 'SHOW_MODAL',
	confirmationModal: 'CONFIRM_MODAL',
	selectionModal: 'SELECT_MODAL',
	messageBanner: 'MESSAGE_BANNER',
	tipModal: 'TIP_MODAL',
	loginModal: 'LOGIN_MODAL',
	cartModal: 'CART_MODAL',
	checkoutModal: 'CHECKOUT_MODAL',
	checkAgeModal: 'CHECK_AGE_MODAL',
	emailModal: 'EMAIL_MODAL',
	NewDailyDealModal: 'NEW_DAILY_DEAL_MODAL',
	StoreFrontModal: 'STOREFRONT_MODAL',
	ShopSignUpModal: 'SHOP_SIGN_UP_MODAL',
});
