import { type Organization } from '@cd/data-access';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Modal from './Modal';

interface StoreFrontModalProps {
	dispatchCloseModal: () => void;
	modalVisible: boolean;
}

export default function StoreFrontModal({
	organization,
	modalVisible,
	dispatchCloseModal,
	...props
}: {
	organization: Organization;
} & StoreFrontModalProps) {
	const [openModal, setOpenModal] = useState(false);
	useEffect(() => {
		setOpenModal(modalVisible);
	}, [modalVisible]);

	const closeModal = () => dispatchCloseModal();

	return modalVisible ? (
		<Modal
			// className={twMerge(styles.responsive, 'flex flex-col')}
			modalVisible={openModal}
			onClose={closeModal}
			{...props}
		></Modal>
	) : (
		<></>
	);
}
