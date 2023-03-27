import FlexBox from '../FlexBox';
import Modal, { ModalProps } from './Modal';

function CartModal({ dispatchCloseModal, modalVisible, ...props }: CartModalProps) {
    const closeModal = () => {
        dispatchCloseModal();
    };
    return (
        <Modal modalVisible={modalVisible} onClose={closeModal} {...props}>
            <FlexBox>Cart Modal</FlexBox>
        </Modal>
    );
}

export default CartModal;

interface CartModalProps extends ModalProps {
    dispatchCloseModal: () => void;
}
