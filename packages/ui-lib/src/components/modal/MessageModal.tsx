import { type ModalStateProps } from '@cd/core-lib';
import { useEffect, useState } from 'react';
import { Paragraph } from '../Typography';
import Modal from './Modal';

interface MessageModalProps extends ModalStateProps {
	dispatchCloseModal: () => void;
}

export default function MessageModal({
	modalVisible,
	dispatchCloseModal,
	...props
}: MessageModalProps) {
	const [openModal, setOpenModal] = useState(false);
	useEffect(() => {
		setOpenModal(modalVisible);
	}, [modalVisible]);

	const closeModal = () => dispatchCloseModal();

	return modalVisible ? (
		<Modal
			className={styles.responsive}
			modalVisible={openModal}
			onClose={closeModal}
			{...props}
		>
			<Paragraph className="font-normal text-lg">{props.modalText}</Paragraph>
		</Modal>
	) : (
		<></>
	);
}

const styles = {
	responsive:
		'min-w-full min-h-screen sm:!rounded-none md:min-w-min md:min-h-min md:!rounded p-16 pb-20 bg-light',
};
