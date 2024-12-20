import { type ModalStateProps } from '@cd/core-lib/reducer';
import { useEffect, useState } from 'react';
import Modal from './Modal';

interface StoreFrontModalProps extends ModalStateProps {
	dispatchCloseModal: () => void;
}

export default function StoreFrontModal({
	modalVisible,
	dispatchCloseModal,
	...props
}: StoreFrontModalProps) {
	const [openModal, setOpenModal] = useState(false);
	useEffect(() => {
		setOpenModal(modalVisible);
	}, [modalVisible]);

	const closeModal = () => dispatchCloseModal();

	return modalVisible ? (
		<Modal modalVisible={openModal} onClose={closeModal} {...props}></Modal>
	) : (
		<></>
	);
}
