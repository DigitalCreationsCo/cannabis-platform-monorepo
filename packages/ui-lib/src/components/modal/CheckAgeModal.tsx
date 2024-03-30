import { type ModalStateProps } from '@cd/core-lib';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import CheckAge from '../CheckAge';
import Modal from './Modal';

interface CheckAgeModalProps extends ModalStateProps {
	dispatchCloseModal: () => void;
}

function CheckAgeModal({
	dispatchCloseModal,
	modalVisible,
	...props
}: CheckAgeModalProps) {
	const closeModalAndReset = () => {
		setOpenModal(false);
		dispatchCloseModal();
	};

	const [openModal, setOpenModal] = useState(false);
	useEffect(() => {
		setOpenModal(modalVisible);
	}, [modalVisible]);

	return modalVisible ? (
		<Modal
			disableClickOutside
			className={twMerge(styles.responsive)}
			modalVisible={openModal}
			onClose={dispatchCloseModal}
			{...props}
		>
			<CheckAge onContinue={closeModalAndReset} redirect="/browse" />
		</Modal>
	) : (
		<></>
	);
}

export default CheckAgeModal;

const styles = {
	responsive:
		'min-w-full sm:!rounded-none md:min-w-min md:min-h-min md:!rounded px-12 py-8',
};
