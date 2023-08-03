import { selectCartState } from '@cd/core-lib';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import FlexBox from '../FlexBox';
import Modal from './Modal';

interface CartModalProps {
	dispatchCloseModal: () => void;
	modalVisible: boolean;
}

function CartModal({
	dispatchCloseModal,
	modalVisible,
	...props
}: CartModalProps) {
	const { cart } = useSelector(selectCartState);
	const closeModal = () => {
		dispatchCloseModal();
	};
	const styles = {
		cartModal: ['absolute', 'm-12', 'top-0 right-0 border-2 z-10'],
	};
	return (
		<Modal
			isModalOverlay={false}
			modalVisible={modalVisible}
			onClose={closeModal}
			{...props}
			className={twMerge(styles.cartModal)}
		>
			<FlexBox>Cart Modal</FlexBox>
			{cart.map((item) => (
				<>{item.name}</>
			))}
		</Modal>
	);
}

export default CartModal;
